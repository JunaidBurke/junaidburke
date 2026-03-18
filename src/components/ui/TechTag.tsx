import type { ReactNode } from 'react'

interface TechTagProps {
  children: ReactNode
}

export function TechTag({ children }: TechTagProps) {
  return (
    <span className="font-mono text-xs bg-bg-card border border-border rounded-md px-2.5 py-1 text-text-muted inline-block">
      {children}
    </span>
  )
}
