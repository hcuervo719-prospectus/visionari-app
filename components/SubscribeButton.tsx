// components/SubscribeButton.tsx
// Paddle checkout button — used in subscribe page and trial banner
'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

interface Props {
  userId: string
  userEmail: string
  label?: string
  className?: string
}

export default function SubscribeButton({
  userId,
  userEmail,
  label = 'Subscribe — $30/month',
  className = '',
}: Props) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = () => {
    setLoading(true)

    if (!window.Paddle) {
      alert('Payment system not loaded. Please refresh the page.')
      setLoading(false)
      return
    }

    window.Paddle.Checkout.open({
      items: [
        {
          priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID,
          quantity: 1,
        },
      ],
      customer: { email: userEmail },
      customData: { userId },
      successCallback: () => {
        // Paddle webhook handles the DB update
        // Redirect to dashboard — subscription_status will be updated
        window.location.href = '/dashboard?subscribed=1'
      },
      closeCallback: () => {
        setLoading(false)
      },
    })
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`flex items-center justify-center gap-2 font-semibold transition
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {label}
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  )
}
