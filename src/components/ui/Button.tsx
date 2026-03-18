import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary'

type BaseProps = {
  variant?: ButtonVariant
  children: ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-green text-[#07070c] font-medium rounded-lg px-5 py-2.5 min-h-[44px] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,255,170,0.2)]',
  secondary:
    'border border-border text-text rounded-lg px-5 py-2.5 min-h-[44px] transition-all duration-200 hover:bg-bg-card hover:border-border-hi',
}

export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const className = cn(
    'inline-flex items-center justify-center cursor-pointer',
    variantStyles[variant]
  )

  if ((props as ButtonAsAnchor).href !== undefined) {
    const { href, ...anchorProps } = props as Omit<ButtonAsAnchor, 'variant' | 'children'>
    return (
      <a href={href} className={cn(className, anchorProps.className)} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { ...buttonProps } = props as Omit<ButtonAsButton, 'variant' | 'children'>
  return (
    <button className={cn(className, buttonProps.className)} {...buttonProps}>
      {children}
    </button>
  )
}
