import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'live' | 'beta' | 'dev' | 'new' | 'skill'

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  live: 'bg-green/10 border-green/30 text-green',
  beta: 'bg-purple/10 border-purple/30 text-purple',
  dev: 'bg-orange/10 border-orange/30 text-orange',
  new: 'bg-red/10 border-red/30 text-red',
  skill: 'bg-cyan/10 border-cyan/30 text-cyan',
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <>
      {variant === 'live' && (
        <style>{`
          @keyframes pulse-green {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 170, 0.15); }
            50% { box-shadow: 0 0 0 4px rgba(0, 255, 170, 0); }
          }
        `}</style>
      )}
      <span
        className={cn(
          'font-mono uppercase text-xs tracking-[0.05em] rounded-full border px-3 py-1 inline-flex items-center gap-1.5',
          variantStyles[variant]
        )}
        style={variant === 'live' ? { animation: 'pulse-green 2s ease-in-out infinite' } : undefined}
      >
        {children}
      </span>
    </>
  )
}
