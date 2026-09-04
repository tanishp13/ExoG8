import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ExoGait3D from './components/ExoGait3D'
import SpecsGrid from './components/SpecsGrid'
import Applications from './components/Applications'
import PitchDeck from './components/PitchDeck'
import WaitlistFooter from './components/WaitlistFooter'

export default function App() {
  return (
    <div className="min-h-screen bg-space text-white">
      <Navbar />
      <main>
        <Hero />
        <ExoGait3D />
        <SpecsGrid />
        <Applications />
        <PitchDeck />
      </main>
      <WaitlistFooter />
    </div>
  )
}
