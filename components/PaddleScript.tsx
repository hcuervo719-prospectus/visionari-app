// components/PaddleScript.tsx
'use client'

import { useEffect } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    Paddle: any
  }
}

export default function PaddleScript() {
  useEffect(() => {
    if (window.Paddle) {
      window.Paddle.Environment.set(process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'production')
      window.Paddle.Initialize({
        token: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
      })
    }
  }, [])

  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.Paddle) {
          window.Paddle.Environment.set(process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'production')
          window.Paddle.Initialize({
            token: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
          })
        }
      }}
    />
  )
}
