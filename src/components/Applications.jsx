import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartPulse, HardHat, Dumbbell, ArrowUpRight } from 'lucide-react'

const APPLICATIONS = [
  {
    icon: HeartPulse,
    tag: 'Medical Rehabilitation',
    title: 'Restore Natural Gait',
    desc: 'Supports gait restoration and joint unloading for patients regaining mobility, with assistance tuned to each rehabilitation phase.',
    points: ['Gait pattern restoration', 'Dynamic joint unloading', 'Clinician-configurable assist curves'],
  },
  {
    icon: HardHat,
    tag: 'Industrial Assistance',
    title: 'Reduce Workforce Fatigue',
    desc: 'Cuts fatigue and injury risk for workers on their feet all shift — from warehouse floors to assembly lines and field service.',
    points: ['Over-the-shoulder heavy lifting support', 'Extended-shift fatigue reduction', 'Bulky-exosuit-free, worn under uniform'],
  },
  {
    icon: Dumbbell,
    tag: 'Athletic Performance',
    title: 'Train Harder, Recover Faster',
    desc: 'Provides high-intensity training assist and active recovery support for athletes pushing output and managing load.',
    points: ['High-intensity training assist', 'Active recovery load management', 'Real-time biomechanical feedback'],
  },
]

export default function Applications() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="applications" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Use Cases</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Built for Every Body in Motion
          </h2>
          <p className="mt-4 text-silver/60">
            One platform, three domains — the same adaptive assistance engine tuned to
            different demands.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {APPLICATIONS.map(({ icon: Icon, tag, title, desc, points }, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(tag)}
              onMouseLeave={() => setHovered(null)}
              className="glass-panel group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:border-electric-blue/40 hover:-translate-y-1"
            >
              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-electric-blue/10 to-transparent opacity-0 transition-opacity duration-300 ${
                  hovered === tag ? 'opacity-100' : ''
                }`}
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-electric-blue/30 bg-electric-blue/10 text-electric-blue">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <span className="relative mt-5 section-eyebrow">{tag}</span>
              <h3 className="relative mt-2 text-xl font-bold text-white">{title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-silver/60">{desc}</p>

              <ul className="relative mt-5 space-y-2 border-t border-white/10 pt-5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-silver/70">
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-blue" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
