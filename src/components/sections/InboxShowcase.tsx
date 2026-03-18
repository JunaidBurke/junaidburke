'use client'

import { useState } from 'react'

type Urgency = 'critical' | 'high' | 'medium' | 'low'

interface Email {
  sender: string
  subject: string
  urgency: Urgency
  actions: [string, string]
}

const emails: Email[] = [
  { sender: 'Twilio', subject: 'A2P Registration Approved', urgency: 'high', actions: ['View', 'Archive'] },
  { sender: 'Stripe', subject: 'Invoice Payment Failed', urgency: 'critical', actions: ['Retry', 'Contact'] },
  { sender: 'GitHub', subject: 'PR #47 Review Requested', urgency: 'medium', actions: ['Review', 'Snooze'] },
  { sender: 'Vercel', subject: 'Deployment Succeeded', urgency: 'low', actions: ['View', 'Archive'] },
]

const urgencyBadge: Record<Urgency, string | null> = {
  critical: 'bg-red/10 border border-red/30 text-red',
  high: 'bg-green/10 border border-green/30 text-green',
  medium: 'bg-orange/10 border border-orange/30 text-orange',
  low: null,
}

const urgencyLabel: Record<Urgency, string> = {
  critical: 'critical',
  high: 'high',
  medium: 'medium',
  low: 'low',
}

interface TriggeredState {
  emailIndex: number
  actionIndex: number
}

export function InboxShowcase() {
  const [triggered, setTriggered] = useState<TriggeredState | null>(null)

  function handleAction(emailIndex: number, actionIndex: number) {
    setTriggered({ emailIndex, actionIndex })
    setTimeout(() => setTriggered(null), 1000)
  }

  function isTriggered(emailIndex: number, actionIndex: number): boolean {
    return (
      triggered !== null &&
      triggered.emailIndex === emailIndex &&
      triggered.actionIndex === actionIndex
    )
  }

  return (
    <div className="bg-bg-card border border-border rounded-xl p-4 space-y-2 my-6">
      <div className="font-mono text-xs text-text-dim uppercase tracking-wider mb-3">
        Inbox Preview
      </div>
      {emails.map((email, emailIndex) => (
        <div
          key={emailIndex}
          className="bg-bg-flow border border-border rounded-lg p-4 flex items-center justify-between gap-4"
        >
          {/* Left side */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-xs font-mono shrink-0">
              {email.sender[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-text font-medium truncate">{email.subject}</p>
              <p className="text-xs text-text-dim">{email.sender}</p>
            </div>
            {urgencyBadge[email.urgency] !== null ? (
              <span
                className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${urgencyBadge[email.urgency]}`}
              >
                {urgencyLabel[email.urgency]}
              </span>
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim shrink-0">
                {urgencyLabel[email.urgency]}
              </span>
            )}
          </div>

          {/* Right side: action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {email.actions.map((action, actionIndex) => (
              <button
                key={actionIndex}
                onClick={() => handleAction(emailIndex, actionIndex)}
                className="text-xs font-mono px-3 py-1.5 border border-border rounded-md hover:bg-bg-card-hover transition-colors cursor-pointer min-w-[52px] text-center text-text-muted"
              >
                {isTriggered(emailIndex, actionIndex) ? '✓' : action}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
