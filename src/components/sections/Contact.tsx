'use client'

import { useState, useRef, useCallback, useEffect, type FormEvent } from 'react'
import Script from 'next/script'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/ui/FadeIn'
import { Github, Linkedin, Twitter, Mail, Calendar, Send } from 'lucide-react'

interface FormState {
  name: string
  email: string
  message: string
  honeypot: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  message: '',
  honeypot: '',
}

const INPUT_CLASS =
  'bg-bg-flow border border-border rounded-lg px-4 py-3 text-text text-sm ' +
  'focus:outline-none focus:border-green/50 focus:ring-1 focus:ring-green/20 ' +
  'placeholder:text-text-dim w-full'

const SOCIAL_LINKS = [
  {
    label: 'X / Twitter',
    handle: '@JunaidBurke',
    href: 'https://x.com/JunaidBurke',
    Icon: Twitter,
  },
  {
    label: 'LinkedIn',
    handle: 'junaidburke',
    href: 'https://linkedin.com/in/junaidburke',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    handle: 'JunaidBurke',
    href: 'https://github.com/JunaidBurke',
    Icon: Github,
  },
] as const

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const renderTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: 'dark',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    })
  }, [])

  useEffect(() => {
    if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
      renderTurnstile()
    }
  }, [renderTurnstile])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    if (!turnstileToken) {
      setErrorMessage('Please complete the verification.')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      })

      if (res.ok) {
        setStatus('success')
        setForm(initialForm)
        setTurnstileToken('')
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
        }
      } else {
        const data = await res.json() as { error?: string | { formErrors?: string[] } }
        const msg =
          typeof data.error === 'string'
            ? data.error
            : data.error?.formErrors?.[0] ?? 'Something went wrong. Please try again.'
        setErrorMessage(msg)
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        {/* LEFT COLUMN */}
        <FadeIn>
          <SectionHeading label="Get In Touch" title="Let's Build Something" />

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className={INPUT_CLASS}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className={INPUT_CLASS}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me what you're building..."
              required
              rows={5}
              className={INPUT_CLASS + ' resize-none'}
            />

            <div ref={turnstileRef} className="flex justify-center" />
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              onReady={renderTurnstile}
            />

            <button
              type="submit"
              disabled={status === 'loading' || !turnstileToken}
              className="flex items-center justify-center gap-2 w-full bg-green text-bg font-semibold
                         rounded-lg px-6 py-3 text-sm hover:bg-green/90 transition-colors duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
            >
              {status === 'loading' ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="text-green text-sm text-center">Message sent!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">{errorMessage}</p>
            )}
          </form>

          {/* Calendly card */}
          <div className="bg-bg-card border-2 border-green/30 rounded-xl p-6 mt-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent pointer-events-none" />
            <div className="relative flex items-start gap-4">
              <div className="p-2 bg-green/10 rounded-lg">
                <Calendar className="w-5 h-5 text-green" />
              </div>
              <div className="flex-1">
                <h3 className="text-text font-semibold mb-1">Book a Call</h3>
                <p className="text-text-muted text-sm mb-3">
                  30 minutes to explore how we can work together.
                </p>
                <a
                  href="https://calendly.com/junaidburke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green font-mono text-sm
                             hover:underline underline-offset-4 transition-all"
                >
                  Schedule time →
                </a>
              </div>
            </div>
          </div>

          {/* Email card */}
          <div className="bg-bg-card border border-border rounded-xl p-4 mt-4 flex items-center gap-3">
            <Mail className="w-5 h-5 text-text-muted flex-shrink-0" />
            <a
              href="mailto:junaidburke@gmail.com"
              className="text-text-muted text-sm hover:text-text transition-colors"
            >
              junaidburke@gmail.com
            </a>
          </div>
        </FadeIn>

        {/* RIGHT COLUMN */}
        <FadeIn delay={150}>
          <div className="flex flex-col gap-4 md:pt-[88px]">
            {SOCIAL_LINKS.map(({ label, handle, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-card border border-border rounded-xl p-5 flex items-center gap-4
                           hover:bg-bg-card-hover hover:border-border-hi transition-all duration-200"
              >
                <Icon className="w-5 h-5 text-text-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-text font-medium">{label}</p>
                  <p className="text-text-dim font-mono text-sm truncate">{handle}</p>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
