// app/api/paddle/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Paddle webhook received:', body.event_type)

    // Validate webhook signature (importante para producción)
    // Por ahora lo simplificamos, pero deberías validar la firma

    const eventType = body.event_type
    const data = body.data

    // Solo procesamos transacciones completadas
    if (eventType === 'transaction.completed') {
      const transactionId = data.id
      const customData = data.custom_data
      const userId = customData?.userId

      if (!userId) {
        console.error('No userId in webhook data')
        return NextResponse.json({ error: 'No userId provided' }, { status: 400 })
      }

      const supabase = await createClient()

      // 1. Guardar la compra en la tabla purchases
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: userId,
          paddle_transaction_id: transactionId,
          amount: data.details.totals.total,
          currency: data.currency_code,
          status: 'completed',
          product_id: process.env.PADDLE_PRODUCT_ID,
        })

      if (purchaseError) {
        console.error('Error saving purchase:', purchaseError)
        return NextResponse.json({ error: 'Error saving purchase' }, { status: 500 })
      }

      // 2. Actualizar el perfil del usuario con has_purchased = true
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          has_purchased: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (profileError) {
        console.error('Error updating profile:', profileError)
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 })
      }

      console.log(`Purchase completed for user ${userId}`)

      return NextResponse.json({ 
        success: true,
        message: 'Purchase processed successfully' 
      })
    }

    // Para otros eventos, simplemente retornamos success
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
