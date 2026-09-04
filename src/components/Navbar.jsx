import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: '3D Breakdown', href: '#3d-model' },
  { label: 'Specs', href: '#specs' },
  { label: 'Applications', href: '#applications' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-space/70 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_0_rgba(0,240,255,0.08)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a
          href="#overview"
          onClick={(e) => handleNavClick(e, '#overview')}
          className="group flex items-center gap-2.5"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br from-[#3a3f4d] via-[#181a22] to-[#0c0d12] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_10px_rgba(0,0,0,0.5)]">
            <Zap className="h-4.5 w-4.5 text-electric-blue drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-lg font-bold tracking-tight text-white">
            Exo<span className="text-electric-blue">Gait</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-silver/80 transition-colors hover:text-electric-blue"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a href="#waitlist" onClick={(e) => handleNavClick(e, '#waitlist')} className="btn-primary">
            Join Waitlist
          </a>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-space/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-silver/80 transition-colors hover:bg-white/5 hover:text-electric-blue"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={(e) => handleNavClick(e, '#waitlist')}
                className="btn-primary mt-2 w-full"
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
