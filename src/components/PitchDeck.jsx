import { motion } from 'framer-motion'
import { AlertTriangle, Lightbulb, Waypoints, Map } from 'lucide-react'

const PROBLEMS = [
  'Long periods of standing cause continuous load, fatigue and discomfort.',
  'Repetitive movement — frequent bending and walking — increases physical strain.',
  'Fatigue builds over time and movement slowly becomes harder.',
  'Existing assistance is limited: bulky, restrictive, costly or impractical.',
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Wear & Calibrate', desc: 'Put on ExoGait and use the mobile app to calibrate it to your natural movement.' },
  { step: '02', title: 'Sense', desc: 'Sensors continuously capture muscle activity and leg movement.' },
  { step: '03', title: 'Predict', desc: 'The onboard TinyML model identifies your movement pattern and anticipates required assistance.' },
  { step: '04', title: 'Assist', desc: 'The motor activates the cable mechanism to provide targeted knee assistance in real time.' },
]

const ROADMAP = [
  { q: 'Q2', title: 'Ideation', desc: 'Defining the product architecture & core design.' },
  { q: 'Q3', title: 'Prototype', desc: 'Building and integrating a functional prototype.' },
  { q: 'Q4', title: 'Validation', desc: 'Test, evaluation & refinement of the prototype.' },
]

export default function PitchDeck() {
  return (
    <section id="pitch-deck" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-electric-blue/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Pitch Deck</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            To the Millions Who Carry the Load
          </h2>
          <p className="mt-4 text-lg text-electric-blue">We've got your knees.</p>
        </div>

        {/* problem / solution */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="h-5 w-5 text-electric-blue" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">The Problem</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-silver/70">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric-blue/60" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-2.5">
              <Lightbulb className="h-5 w-5 text-electric-blue" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">The Solution</h3>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-silver/70">
              ExoGait is a wearable exosleeve that provides real-time assistance during everyday
              movement — sensing muscle activity and body motion, then supporting the knee
              exactly when assistance is needed, in a lightweight, unobtrusive form.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {['Real-time assistance', 'Movement sensing', 'Wearable design'].map((f) => (
                <div key={f} className="rounded-lg border border-electric-blue/20 bg-electric-blue/5 px-3 py-2.5 text-center text-xs font-medium text-electric-blue">
                  {f}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* how it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center gap-2.5">
            <Waypoints className="h-5 w-5 text-electric-blue" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">How It Works</h3>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-panel relative rounded-2xl p-5"
              >
                <span className="font-mono text-3xl font-black text-electric-blue/25">{s.step}</span>
                <h4 className="mt-2 text-sm font-semibold text-white">{s.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-silver/60">{s.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="absolute -right-2.5 top-1/2 hidden h-px w-5 -translate-y-1/2 bg-gradient-to-r from-electric-blue/40 to-transparent lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center gap-2.5">
            <Map className="h-5 w-5 text-electric-blue" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Roadmap</h3>
          </div>
          <div className="relative mt-8">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 sm:block" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {ROADMAP.map((r) => (
                <div key={r.q} className="relative flex flex-col items-start">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-electric-blue bg-space font-mono text-xs font-bold text-electric-blue">
                    {r.q}
                  </div>
                  <h4 className="mt-3 text-sm font-semibold text-white">{r.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-silver/60">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
