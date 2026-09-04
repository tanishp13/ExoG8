import { motion } from 'framer-motion'
import { ArrowRight, Presentation, Activity, Gauge, ShieldCheck } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: Activity, label: 'Adaptive Assistance', desc: 'sEMG-gated, pre-motion activation' },
  { icon: ShieldCheck, label: 'Industrial Durability', desc: 'IP54-rated, aerospace-grade frame' },
  { icon: Gauge, label: 'Biomechanical Torque', desc: 'Up to 18Nm peak, zero delay' },
]

function scrollTo(id) {
  document.getElementById(id.replace(/^#/, ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  return (
    <section
      id="overview"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-space" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-electric-blue/20 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[400px] w-[500px] rounded-full bg-electric-blue/10 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric-blue/30 bg-electric-blue/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric-blue" />
            <span className="section-eyebrow">Mechatronic Exosleeve · Patent Filed 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Redefining Human Motion:{' '}
            <span className="bg-gradient-to-r from-electric-blue via-cyan-300 to-silver bg-clip-text text-transparent">
              The Next-Gen Mechatronic Exosleeve.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-silver/70 sm:text-lg"
          >
            ExoGait delivers adaptive, real-time biomechanical assistance — reading muscle
            intent before you move, applying precise joint torque, and surviving industrial
            duty cycles in an aerospace-grade, sub-1.2kg frame.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button onClick={() => scrollTo('#3d-model')} className="btn-primary">
              Explore 3D Breakdown
              <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollTo('#pitch-deck')} className="btn-secondary">
              <Presentation className="h-4 w-4" />
              View Pitch Deck
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="glass-panel rounded-xl p-4">
                <Icon className="mb-2.5 h-5 w-5 text-electric-blue" strokeWidth={1.75} />
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-1 text-xs leading-snug text-silver/60">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-full border border-electric-blue/20 animate-pulse-slow" />
            <div className="absolute inset-8 rounded-full border border-electric-blue/10" />
            <div className="absolute inset-16 rounded-full border border-white/5" />
            <div className="glass-panel absolute inset-0 flex items-center justify-center rounded-3xl shadow-glow-lg">
              <div className="animate-float text-center">
                <p className="font-mono text-6xl font-black text-electric-blue drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                  18<span className="text-2xl align-top">Nm</span>
                </p>
                <p className="mt-2 section-eyebrow">Peak Assistance Torque</p>
                <div className="mx-auto mt-6 h-px w-16 bg-white/10" />
                <p className="mt-6 font-mono text-3xl font-bold text-white">&lt;0.1ms</p>
                <p className="mt-1 text-xs text-silver/50">EMG Signal Latency</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
