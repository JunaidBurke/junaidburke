'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'backdrop-blur-xl backdrop-saturate-150 bg-bg/80',
        'border-b transition-colors duration-300',
        scrolled ? 'border-border/50' : 'border-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center font-mono text-sm font-medium text-text"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green mr-2" />
          junaidburke
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href, isRoute }) =>
            isRoute ? (
              <Link
                key={label}
                href={href}
                className="font-mono text-sm text-text-muted hover:text-text transition-colors duration-150"
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                className="font-mono text-sm text-text-muted hover:text-text transition-colors duration-150"
              >
                {label}
              </a>
            ),
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-bg-card transition-colors duration-150"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-text-muted" />
            ) : (
              <Menu className="w-4 h-4 text-text-muted" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-out',
          'bg-bg/95 backdrop-blur-xl border-b border-border',
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="py-4 px-6 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href, isRoute }) =>
            isRoute ? (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-sm text-text-muted hover:text-text transition-colors duration-150"
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-sm text-text-muted hover:text-text transition-colors duration-150"
              >
                {label}
              </a>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}
