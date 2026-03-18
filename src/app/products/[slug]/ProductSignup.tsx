'use client'

import { useState } from 'react'

interface ProductSignupProps {
  productName: string
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function ProductSignup({ productName }: ProductSignupProps) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: `I'm interested in ${productName} and would like to be notified when it launches.`,
          honeypot: '',
          subject: `Product Interest: ${productName}`,
        }),
      })

      if (!res.ok) {
        const body = await res.json() as { error?: string }
        setErrorMsg(body.error ?? 'Something went wrong. Please try again.')
        setState('error')
        return
      }

      setState('success')
      form.reset()
    } catch {
      setErrorMsg('Network error. Please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <p className="text-sm text-green font-mono">
        ✓ You&apos;re on the list. We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        minLength={1}
        className="w-full rounded-lg border border-white/10 bg-bg-base px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-green/40 transition-colors min-h-[44px]"
      />
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="w-full rounded-lg border border-white/10 bg-bg-base px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-green/40 transition-colors min-h-[44px]"
      />
      {state === 'error' && (
        <p className="text-xs text-red">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded-lg bg-green text-bg-base font-semibold text-sm px-4 py-3 min-h-[44px] hover:bg-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {state === 'loading' ? 'Sending…' : 'Notify Me'}
      </button>
    </form>
  )
}
