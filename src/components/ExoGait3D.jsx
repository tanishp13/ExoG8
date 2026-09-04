import { Suspense, useEffect, useMemo, useRef, useState, Component } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Grid, useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cpu, Zap, Layers, Activity, Loader2, BoxSelect } from 'lucide-react'
import * as THREE from 'three'

const MODEL_URL = '/models/exogait.glb'

// The source GLB's real-world scale/origin can vary, so the model is
// auto-normalized to fit a box of this size (see NormalizedModel below).
// Hotspot markers and camera views are authored in that normalized space,
// centered at the origin, so they line up regardless of the file's units.
const TARGET_SIZE = 1.6

const HOTSPOTS = [
  {
    id: 'actuator',
    icon: Zap,
    name: 'High-Torque Actuators',
    fn: 'Cable-driven geared motor stage that converts electrical power into precise joint assistance.',
    spec: 'Delivers up to 18Nm assistance with zero delay.',
    marker: [0.22, 0.12, 0.08],
    view: { pos: [0.75, 0.45, 0.65], tgt: [0.22, 0.12, 0.08] },
  },
  {
    id: 'emg',
    icon: Activity,
    name: 'Biometric EMG Sensors',
    fn: 'Adhesive sEMG array on the thigh reads muscle activation before motion becomes visible.',
    spec: 'Reads muscle signals in <0.1ms for predictive motion.',
    marker: [0.14, 0.32, 0.2],
    view: { pos: [0.42, 0.55, 0.78], tgt: [0.14, 0.32, 0.2] },
  },
  {
    id: 'frame',
    icon: Layers,
    name: 'Carbon-Fiber Frame',
    fn: 'Structural spine and printed chassis carrying the drivetrain loads without adding bulk.',
    spec: 'Ultralight aerospace-grade structural spine weighing <1.2kg.',
    marker: [0.0, -0.05, -0.02],
    view: { pos: [1.0, 0.55, 1.0], tgt: [0.0, -0.05, -0.02] },
  },
  {
    id: 'battery',
    icon: Cpu,
    name: 'Micro-CPU & Battery',
    fn: 'Lumbar-mounted hub pairing the control processor with a hot-swappable cell stack.',
    spec: 'Dual hot-swappable modules providing 8 hours continuous run-time.',
    marker: [0.0, 0.58, -0.16],
    view: { pos: [0.5, 0.8, -0.75], tgt: [0.0, 0.58, -0.16] },
  },
]

const DEFAULT_VIEW = { pos: [1.15, 0.8, 1.15], tgt: [0, 0, 0] }

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error) {
    console.warn('ExoGait3D scene error, falling back:', error?.message ?? error)
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

function GLTFModel() {
  const { scene } = useGLTF(MODEL_URL)
  return <primitive object={scene} dispose={null} />
}

function FallbackArmSegment() {
  const metal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3b3f4c',
        metalness: 0.85,
        roughness: 0.28,
      }),
    [],
  )
  const dark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#14161e',
        metalness: 0.6,
        roughness: 0.4,
      }),
    [],
  )
  const glow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#00f0ff',
        emissive: '#00f0ff',
        emissiveIntensity: 1.6,
        metalness: 0.2,
        roughness: 0.3,
      }),
    [],
  )

  return (
    <group>
      {/* structural spine / carbon frame */}
      <mesh position={[0.02, 0.72, 0.02]} material={dark} castShadow>
        <cylinderGeometry args={[0.055, 0.07, 0.9, 24]} />
      </mesh>
      <mesh position={[0.02, 0.72, 0.02]} material={metal}>
        <cylinderGeometry args={[0.058, 0.058, 0.02, 24]} />
      </mesh>

      {/* thigh control box / actuator housing */}
      <mesh position={[0.17, 0.66, 0.03]} material={metal} castShadow>
        <boxGeometry args={[0.16, 0.24, 0.14]} />
      </mesh>
      <mesh position={[0.17, 0.78, 0.03]} material={glow}>
        <torusGeometry args={[0.045, 0.01, 16, 32]} />
      </mesh>

      {/* EMG sensor pad */}
      <mesh position={[0.222, 0.872, 0.02]} material={glow} castShadow>
        <boxGeometry args={[0.05, 0.03, 0.01]} />
      </mesh>

      {/* lumbar battery + CPU hub */}
      <mesh position={[0.0, 0.97, -0.11]} material={dark} castShadow>
        <boxGeometry args={[0.26, 0.11, 0.13]} />
      </mesh>
      <mesh position={[0.0, 0.97, -0.045]} material={glow}>
        <boxGeometry args={[0.02, 0.02, 0.01]} />
      </mesh>

      {/* knee joint */}
      <mesh position={[0.15, 0.48, 0.03]} material={metal} castShadow>
        <sphereGeometry args={[0.06, 24, 24]} />
      </mesh>

      {/* shin */}
      <mesh position={[0.13, 0.24, 0.02]} material={dark} castShadow>
        <cylinderGeometry args={[0.04, 0.045, 0.46, 20]} />
      </mesh>

      {/* pelvic belt hint */}
      <mesh position={[0.0, 1.02, 0]} material={metal}>
        <torusGeometry args={[0.22, 0.02, 16, 40]} />
      </mesh>
    </group>
  )
}

function Model() {
  return (
    <SceneErrorBoundary fallback={<FallbackArmSegment />}>
      <Suspense fallback={<FallbackArmSegment />}>
        <GLTFModel />
      </Suspense>
    </SceneErrorBoundary>
  )
}

// Measures whatever geometry mounts inside it and rescales/recenters it to
// fit a TARGET_SIZE box at the origin, so hotspot coordinates (authored in
// that normalized space) line up regardless of the source file's real scale.
function NormalizedModel({ onGrounded }) {
  const groupRef = useRef()
  const doneRef = useRef(false)

  useFrame(() => {
    if (doneRef.current || !groupRef.current) return
    const box = new THREE.Box3().setFromObject(groupRef.current)
    if (box.isEmpty()) return
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = TARGET_SIZE / maxDim
    groupRef.current.scale.setScalar(scale)
    groupRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
    doneRef.current = true
    onGrounded?.((box.min.y - center.y) * scale)
  })

  return (
    <group ref={groupRef}>
      <Model />
    </group>
  )
}

function CameraRig({ target }) {
  const { camera } = useThree()
  const controls = useRef()
  const current = useRef({
    pos: new THREE.Vector3(...DEFAULT_VIEW.pos),
    tgt: new THREE.Vector3(...DEFAULT_VIEW.tgt),
  })
  const goal = useRef({
    pos: new THREE.Vector3(...DEFAULT_VIEW.pos),
    tgt: new THREE.Vector3(...DEFAULT_VIEW.tgt),
  })

  useEffect(() => {
    const view = target ?? DEFAULT_VIEW
    goal.current.pos.set(...view.pos)
    goal.current.tgt.set(...view.tgt)
  }, [target])

  useFrame(() => {
    current.current.pos.lerp(goal.current.pos, 0.06)
    current.current.tgt.lerp(goal.current.tgt, 0.06)
    camera.position.copy(current.current.pos)
    if (controls.current) {
      controls.current.target.copy(current.current.tgt)
      controls.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={0.4}
      maxDistance={2.8}
      maxPolarAngle={Math.PI * 0.85}
      enableDamping
      dampingFactor={0.08}
    />
  )
}

function Pin({ hotspot, active, onSelect }) {
  const Icon = hotspot.icon
  return (
    <Html position={hotspot.marker} center distanceFactor={4} zIndexRange={[10, 0]}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSelect(hotspot)
        }}
        className="group relative flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        aria-label={hotspot.name}
      >
        <span
          className={`absolute inset-0 rounded-full border ${
            active ? 'border-electric-blue bg-electric-blue/30' : 'border-electric-blue/50 bg-electric-blue/10'
          } animate-ping-slow`}
          style={{ animation: 'ping 2.2s cubic-bezier(0,0,0.2,1) infinite' }}
        />
        <span
          className={`relative flex h-6 w-6 items-center justify-center rounded-full border shadow-glow transition-colors ${
            active
              ? 'border-electric-blue bg-electric-blue text-space'
              : 'border-electric-blue/70 bg-space/90 text-electric-blue group-hover:bg-electric-blue group-hover:text-space'
          }`}
        >
          <Icon className="h-3 w-3" strokeWidth={2.5} />
        </span>
      </button>
    </Html>
  )
}

function SceneLoader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-space/80 px-4 py-2 text-xs font-mono text-silver/70">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-electric-blue" />
        Loading assembly…
      </div>
    </Html>
  )
}

function CanvasFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#0d0f16] to-[#08080c] px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-electric-blue/30 bg-electric-blue/10 text-electric-blue">
        <BoxSelect className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <p className="text-sm font-medium text-white">3D viewer unavailable in this browser</p>
      <p className="max-w-sm text-xs text-silver/50">
        Your device or network blocked WebGL rendering. The hotspot details below still work.
      </p>
    </div>
  )
}

export default function ExoGait3D() {
  const [active, setActive] = useState(null)
  const [groundY, setGroundY] = useState(-TARGET_SIZE / 2)

  return (
    <section id="3d-model" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[500px] -translate-y-1/2 bg-electric-blue/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Interactive Inspector</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Explore the Assembly, Part by Part
          </h2>
          <p className="mt-4 text-silver/60">
            Drag to orbit the sleeve, or click a hotspot to fly the camera in and inspect the
            engineering behind each subsystem.
          </p>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d0f16] to-[#08080c] shadow-glow-lg">
          <div className="relative h-[480px] w-full sm:h-[560px] lg:h-[640px]">
            <SceneErrorBoundary fallback={<CanvasFallback />}>
              <Canvas shadows camera={{ position: DEFAULT_VIEW.pos, fov: 42 }} dpr={[1, 1.75]}>
                <color attach="background" args={['#08080c']} />
                <fog attach="fog" args={['#08080c', 2.5, 6]} />
                <ambientLight intensity={0.55} />
                <hemisphereLight args={['#3a4a5c', '#08080c', 0.6]} />
                <directionalLight
                  position={[2, 3, 2]}
                  intensity={1.4}
                  castShadow
                  shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-1.5, 1, -1]} intensity={6} color="#00f0ff" distance={4} />
                <pointLight position={[1.2, 0.4, -1.2]} intensity={3} color="#7dd3fc" distance={4} />
                <Suspense fallback={<SceneLoader />}>
                  <NormalizedModel onGrounded={setGroundY} />
                </Suspense>
                <Grid
                  position={[0, groundY, 0]}
                  args={[6, 6]}
                  cellColor="#1c2030"
                  sectionColor="#00f0ff"
                  sectionThickness={0.6}
                  cellThickness={0.3}
                  fadeDistance={4}
                  fadeStrength={1.5}
                />
                {HOTSPOTS.map((h) => (
                  <Pin key={h.id} hotspot={h} active={active?.id === h.id} onSelect={setActive} />
                ))}
                <CameraRig target={active?.view} />
              </Canvas>
            </SceneErrorBoundary>

            {/* legend / reset */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
              <p className="pointer-events-none hidden font-mono text-[10px] uppercase tracking-widest text-silver/40 sm:block">
                Drag to orbit · Scroll to zoom · Click a pin to inspect
              </p>
              {active && (
                <button
                  onClick={() => setActive(null)}
                  className="pointer-events-auto ml-auto rounded-full border border-white/15 bg-space/80 px-4 py-2 text-xs font-medium text-silver/80 backdrop-blur-md transition-colors hover:border-electric-blue/50 hover:text-electric-blue"
                >
                  Reset View
                </button>
              )}
            </div>
          </div>

          {/* detail panel */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.3 }}
                className="glass-panel absolute left-4 top-4 w-[calc(100%-2rem)] max-w-sm rounded-2xl p-5 sm:left-6 sm:top-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-electric-blue/40 bg-electric-blue/10 text-electric-blue">
                      <active.icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="section-eyebrow">Part Detail</p>
                      <h3 className="text-base font-semibold text-white">{active.name}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    className="text-silver/50 transition-colors hover:text-white"
                    aria-label="Close detail panel"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-silver/70">{active.fn}</p>
                <div className="mt-4 rounded-lg border border-electric-blue/20 bg-electric-blue/5 px-3 py-2">
                  <p className="font-mono text-xs text-electric-blue">{active.spec}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* hotspot quick-select chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {HOTSPOTS.map((h) => (
            <button
              key={h.id}
              onClick={() => setActive(h)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                active?.id === h.id
                  ? 'border-electric-blue bg-electric-blue/15 text-electric-blue'
                  : 'border-white/10 bg-white/5 text-silver/70 hover:border-electric-blue/40 hover:text-electric-blue'
              }`}
            >
              <h.icon className="h-3.5 w-3.5" />
              {h.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
