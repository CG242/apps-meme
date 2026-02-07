import Gallery from '../../components/Gallery'
import Navigation from '../../components/Navigation'

export const metadata = {
  title: 'Galerie - Générateur de Mèmes',
  description: 'Visualisez tous vos mèmes créés',
}

export default function GalleryPage() {
  return (
    <>
      <Navigation />
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem', textAlign: 'center', color: '#000000' }}>
          Ma Galerie de Mèmes
        </h1>
        <Gallery />
      </main>
    </>
  )
}

