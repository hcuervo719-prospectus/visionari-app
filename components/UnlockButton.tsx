// components/UnlockButton.tsx
'use client'

import { useState } from 'react'

interface Props {
  userId: string
  userEmail: string
}

export default function UnlockButton({ userId, userEmail }: Props) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    try {
      if (!window.Paddle) {
        alert('Error loading payment system. Please refresh the page.')
        setLoading(false)
        return
      }

      // Open Paddle checkout
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID,
            quantity: 1,
          },
        ],
        customer: {
          email: userEmail,
        },
        customData: {
          userId: userId,
        },
        successCallback: (data: any) => {
          // Redirect to dashboard after successful payment
          window.location.href = '/dashboard?payment=success'
        },
      })
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error opening checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Opening checkout...' : 'Unlock Foundation Module - $10'}
    </button>
  )
}
