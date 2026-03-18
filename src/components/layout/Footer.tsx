import { Github, Linkedin, Twitter } from 'lucide-react'

const SOCIAL_LINKS = [
  {
    label: 'X (Twitter)',
    href: 'https://x.com/JunaidBurke',
    icon: Twitter,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/junaidburke',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/JunaidBurke',
    icon: Github,
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-dim text-sm font-mono">
          © 2026 Junaid Burke · junaidburke.com
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-dim hover:text-text transition-colors duration-150"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
