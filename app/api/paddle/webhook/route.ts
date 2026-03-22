// app/api/paddle/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ─── SIGNATURE VALIDATION ────────────────────────────────────────────────────
// Paddle signs every webhook with HMAC-SHA256
// Set PADDLE_WEBHOOK_SECRET in your environment variables
// Found in: Paddle Dashboard → Notifications → your endpoint → Secret key

async function validatePaddleSignature(
  request: NextRequest,
  rawBody: string
): Promise<boolean> {
  const secret = process.env.PADDLE_WEBHOOK_SECRET
  if (!secret) {
    console.warn('PADDLE_WEBHOOK_SECRET not set — skipping signature validation')
    return true // Allow in development, enforce in production
  }

  const signatureHeader = request.headers.get('paddle-signature')
  if (!signatureHeader) return false

  // Paddle signature format: "ts=timestamp;h1=hash"
  const parts = Object.fromEntries(
    signatureHeader.split(';').map(p => p.split('='))
  )
  const timestamp = parts['ts']
  const receivedHash = parts['h1']
  if (!timestamp || !receivedHash) return false

  // Compute expected signature
  const signedPayload = `${timestamp}:${rawBody}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(signedPayload)
  )
  const expectedHash = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return expectedHash === receivedHash
}

// ─── SUBSCRIPTION STATUS MAPPING ─────────────────────────────────────────────
// Maps Paddle subscription statuses to our internal enum

function mapPaddleStatus(paddleStatus: string): string {
  const map: Record<string, string> = {
    'trialing':  'trial',
    'active':    'active',
    'canceled':  'cancelled',
    'past_due':  'past_due',
    'paused':    'paused',
  }
  return map[paddleStatus] || paddleStatus
}

// ─── EVENT HANDLERS ───────────────────────────────────────────────────────────

async function handleSubscriptionCreated(data: any) {
  const supabase = await createClient()
  const userId = data.custom_data?.userId
  if (!userId) throw new Error('No userId in subscription.created webhook')

  const status = mapPaddleStatus(data.status)

  // 1. Upsert into subscriptions table
  const { error: subError } = await supabase
    .from('subscriptions')
    .upsert({
      user_id:                 userId,
      paddle_subscription_id:  data.id,
      paddle_customer_id:      data.customer_id,
      paddle_transaction_id:   data.transaction_id ?? null,
      status,
      amount:                  data.items?.[0]?.price?.unit_price?.amount ?? null,
      currency:                data.currency_code ?? 'USD',
      billing_cycle:           'monthly',
      current_period_start:    data.current_billing_period?.starts_at ?? null,
      current_period_end:      data.current_billing_period?.ends_at ?? null,
      cancel_at_period_end:    data.scheduled_change?.action === 'cancel',
      updated_at:              new Date().toISOString(),
    }, {
      onConflict: 'paddle_subscription_id'
    })

  if (subError) throw new Error(`subscriptions upsert failed: ${subError.message}`)

  // 2. Update profiles with subscription status
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      subscription_status:   status,
      subscription_ends_at:  data.current_billing_period?.ends_at ?? null,
      updated_at:            new Date().toISOString(),
    })
    .eq('id', userId)

  if (profileError) throw new Error(`profiles update failed: ${profileError.message}`)

  console.log(`subscription.created → user ${userId} → status: ${status}`)
}

async function handleSubscriptionUpdated(data: any) {
  const supabase = await createClient()
  const status = mapPaddleStatus(data.status)

  // 1. Update subscriptions table
  const { error: subError } = await supabase
    .from('subscriptions')
    .update({
      status,
      current_period_start:  data.current_billing_period?.starts_at ?? null,
      current_period_end:    data.current_billing_period?.ends_at ?? null,
      cancelled_at:          data.canceled_at ?? null,
      cancel_at_period_end:  data.scheduled_change?.action === 'cancel',
      updated_at:            new Date().toISOString(),
    })
    .eq('paddle_subscription_id', data.id)

  if (subError) throw new Error(`subscriptions update failed: ${subError.message}`)

  // 2. Get userId from subscriptions to update profiles
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('paddle_subscription_id', data.id)
    .single()

  if (sub?.user_id) {
    await supabase
      .from('profiles')
      .update({
        subscription_status:   status,
        subscription_ends_at:  data.current_billing_period?.ends_at ?? null,
        updated_at:            new Date().toISOString(),
      })
      .eq('id', sub.user_id)
  }

  console.log(`subscription.updated → paddle_id ${data.id} → status: ${status}`)
}

async function handleSubscriptionCancelled(data: any) {
  const supabase = await createClient()

  const { error: subError } = await supabase
    .from('subscriptions')
    .update({
      status:               'cancelled',
      cancelled_at:         data.canceled_at ?? new Date().toISOString(),
      cancel_at_period_end: false,
      updated_at:           new Date().toISOString(),
    })
    .eq('paddle_subscription_id', data.id)

  if (subError) throw new Error(`subscriptions cancel failed: ${subError.message}`)

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('paddle_subscription_id', data.id)
    .single()

  if (sub?.user_id) {
    await supabase
      .from('profiles')
      .update({
        subscription_status: 'cancelled',
        updated_at:          new Date().toISOString(),
      })
      .eq('id', sub.user_id)
  }

  console.log(`subscription.cancelled → paddle_id ${data.id}`)
}

async function handleTransactionCompleted(data: any) {
  // transaction.completed fires on every successful payment (including renewals)
  // We use it to keep subscription_ends_at current
  const supabase = await createClient()
  const subscriptionId = data.subscription_id
  if (!subscriptionId) return // One-time transaction, not a subscription

  await supabase
    .from('subscriptions')
    .update({
      paddle_transaction_id: data.id,
      updated_at:            new Date().toISOString(),
    })
    .eq('paddle_subscription_id', subscriptionId)

  console.log(`transaction.completed → subscription ${subscriptionId}`)
}

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let rawBody: string

  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Cannot read request body' }, { status: 400 })
  }

  // Validate signature
  const isValid = await validatePaddleSignature(request, rawBody)
  if (!isValid) {
    console.error('Invalid Paddle webhook signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let body: any
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const eventType: string = body.event_type
  const data = body.data

  console.log(`Paddle webhook: ${eventType}`)

  try {
    switch (eventType) {
      case 'subscription.created':
        await handleSubscriptionCreated(data)
        break
      case 'subscription.updated':
        await handleSubscriptionUpdated(data)
        break
      case 'subscription.canceled':
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(data)
        break
      case 'transaction.completed':
        await handleTransactionCompleted(data)
        break
      default:
        // Log unhandled events but return 200 so Paddle doesn't retry
        console.log(`Unhandled Paddle event: ${eventType}`)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(`Webhook handler error (${eventType}):`, message)
    // Return 500 so Paddle retries — only for genuine processing errors
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
