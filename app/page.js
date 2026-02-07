import MemeEditor from '../components/MemeEditor'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <main className="container" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <MemeEditor />
      </main>
    </>
  )
}

