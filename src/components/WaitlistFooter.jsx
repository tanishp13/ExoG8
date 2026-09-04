import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2, Send, Zap } from 'lucide-react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function WaitlistFooter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success
  const [entries, setEntries] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setStatus('error')
      return
    }
    setEntries((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]))
    setStatus('success')
    setEmail('')
  }

  return (
    <footer id="waitlist" className="relative overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-electric-blue/10 blur-[160px]" />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white sm:text-5xl"
        >
          Be First to Wear the Future of Motion.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-silver/60"
        >
          Join the waitlist for early access, pilot programs, and partnership opportunities as
          ExoGait moves from prototype to production.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status !== 'idle') setStatus('idle')
              }}
              placeholder="you@company.com"
              aria-label="Email address"
              className={`w-full rounded-full border bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-silver/30 backdrop-blur-md transition-colors focus:outline-none focus:ring-2 ${
                status === 'error'
                  ? 'border-red-500/60 focus:ring-red-500/30'
                  : 'border-white/15 focus:border-electric-blue/60 focus:ring-electric-blue/20'
              }`}
            />
          </div>
          <button type="submit" className="btn-primary shrink-0">
            Join Waitlist
            <Send className="h-4 w-4" />
          </button>
        </motion.form>

        <div className="mt-4 h-5">
          {status === 'error' && (
            <p className="text-xs font-medium text-red-400">Enter a valid email address to continue.</p>
          )}
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-1.5 text-xs font-medium text-electric-blue"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              You're on the list — {entries[entries.length - 1]}
            </motion.p>
          )}
        </div>

        <p className="mt-3 font-mono text-[11px] text-silver/30">
          {entries.length > 0
            ? `${entries.length} engineer${entries.length === 1 ? '' : 's'} on the waitlist this session`
            : 'No spam. Just build updates and early access windows.'}
        </p>
      </div>

      <div className="relative mt-20 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row lg:px-12">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br from-[#3a3f4d] via-[#181a22] to-[#0c0d12]">
              <Zap className="h-4 w-4 text-electric-blue" strokeWidth={2.5} />
            </span>
            <span className="font-mono text-sm font-bold text-white">
              Exo<span className="text-electric-blue">Gait</span>
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right">
            <a
              href="mailto:contact@exogait.tech"
              className="text-sm font-medium text-silver/70 transition-colors hover:text-electric-blue"
            >
              contact@exogait.tech
            </a>
            <p className="font-mono text-[11px] text-silver/30">
              © {new Date().getFullYear()} ExoGait. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
