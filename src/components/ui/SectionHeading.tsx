import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ label, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', className)}>
      <span className="font-mono text-green uppercase text-xs tracking-[0.2em] mb-3 block">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">{title}</h2>
      {description && (
        <p className="text-text-muted text-lg max-w-2xl">{description}</p>
      )}
    </div>
  )
}
