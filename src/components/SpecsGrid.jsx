import { motion } from 'framer-motion'
import { Timer, Gauge, BatteryCharging, Feather, Check, Minus } from 'lucide-react'

const PERFORMANCE_CARDS = [
  {
    icon: Timer,
    label: 'Response Latency',
    value: '<0.1',
    unit: 'ms',
    desc: 'sEMG signal-to-assist gating, pre-motion activation.',
  },
  {
    icon: Gauge,
    label: 'Torque Output',
    value: '18',
    unit: 'Nm peak',
    desc: '11Nm continuous knee-joint assistance.',
  },
  {
    icon: BatteryCharging,
    label: 'Battery Life',
    value: '8',
    unit: 'hrs',
    desc: 'Dual hot-swappable 6S2P cell modules.',
  },
  {
    icon: Feather,
    label: 'System Weight',
    value: '<1.2',
    unit: 'kg',
    desc: 'Aerospace-grade carbon-fiber structural spine.',
  },
]

const SPEC_ROWS = [
  ['Structural materials', 'PETG-CF housing, GFRP knee bracket, hardened-steel gear pair'],
  ['Actuation', 'PG42-775 geared motor, 24V, 25:1, Hall encoder feedback'],
  ['Transmission', 'PTFE-lined Bowden cable, Kevlar core, 40mm knee moment arm'],
  ['Sensing suite', 'Adhesive sEMG array + onboard IMU, edge-processed'],
  ['Safety systems', '5 independent layers incl. 700N ±10% breakaway release'],
  ['Ingress protection', 'IP54 — dust protected, splash resistant'],
  ['Connectivity', 'Bluetooth 5.2 companion app, on-device TinyML, OTA updates'],
  ['Cable rating', '1,200N rated, 500N max working tension'],
]

const COMPARISON = {
  features: [
    'Latency & Natural Feel',
    'Weight Distribution',
    'Control Intelligence',
    'Safety Layers',
    'Target Daily Use',
  ],
  columns: [
    {
      name: 'ExoGait',
      highlight: true,
      values: [
        'Pre-motion activation (sEMG-gated)',
        'Hip-mounted motor',
        'Edge AI, dual-gate, no cloud',
        '5 independent',
        'Mild-to-moderate augmentation',
      ],
    },
    {
      name: 'Skip MO / GO',
      values: ['Foot lag 80–200ms', 'Leg-mounted motor', 'Closed-box device', 'Single-layer', 'Premium outdoor'],
    },
    {
      name: 'Hypershell / Dnsys',
      values: ['Foot lag 80–200ms', 'Waist-mounted', 'Closed-box device', 'Single-layer typical', 'Consumer outdoor'],
    },
    {
      name: 'Passive Orthoses',
      values: ['No active torque', 'Passive support only', 'No active control', 'No active safety', 'Minor support'],
    },
    {
      name: 'Rigid Clinical Exos',
      values: ['Delayed, non-adaptive', 'Heavy clinical frame', 'Non-adaptive', 'Single-layer', 'Clinical rehab'],
    },
  ],
}

export default function SpecsGrid() {
  return (
    <section id="specs" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Tech Specifications</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Engineered for Precision Under Load
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PERFORMANCE_CARDS.map(({ icon: Icon, label, value, unit, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-panel group rounded-2xl p-5 transition-colors hover:border-electric-blue/40 sm:p-6"
            >
              <Icon className="h-5 w-5 text-electric-blue" strokeWidth={1.75} />
              <p className="mt-4 font-mono text-3xl font-bold text-white sm:text-4xl">
                {value}
                <span className="ml-1 text-base font-medium text-electric-blue">{unit}</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-silver/90">{label}</p>
              <p className="mt-1 text-xs leading-snug text-silver/50">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* spec matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass-panel mt-8 overflow-hidden rounded-2xl"
        >
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Materials · Ingress · Software Matrix
            </h3>
          </div>
          <div className="divide-y divide-white/5">
            {SPEC_ROWS.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 px-6 py-3.5 sm:flex-row sm:items-center sm:gap-6">
                <span className="w-full shrink-0 text-xs font-mono uppercase tracking-wide text-silver/50 sm:w-56">
                  {label}
                </span>
                <span className="text-sm text-silver/90">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* competitive comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass-panel mt-8 overflow-hidden rounded-2xl"
        >
          <div className="border-b border-white/10 px-6 py-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Competitive Landscape
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wide text-silver/50">
                    Feature
                  </th>
                  {COMPARISON.columns.map((col) => (
                    <th
                      key={col.name}
                      className={`px-4 py-3 text-left text-xs font-mono uppercase tracking-wide ${
                        col.highlight ? 'text-electric-blue' : 'text-silver/50'
                      }`}
                    >
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON.features.map((feature, rowIdx) => (
                  <tr key={feature}>
                    <td className="px-6 py-3.5 text-xs font-medium text-silver/70">{feature}</td>
                    {COMPARISON.columns.map((col) => (
                      <td
                        key={col.name}
                        className={`px-4 py-3.5 text-xs leading-snug ${
                          col.highlight ? 'bg-electric-blue/5 font-medium text-white' : 'text-silver/60'
                        }`}
                      >
                        <div className="flex items-start gap-1.5">
                          {col.highlight ? (
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-electric-blue" />
                          ) : (
                            <Minus className="mt-0.5 h-3 w-3 shrink-0 text-silver/30" />
                          )}
                          <span>{col.values[rowIdx]}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
