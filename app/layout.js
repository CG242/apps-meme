import './globals.css'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Générateur de Mèmes',
  description: 'Créez vos propres mèmes facilement avec notre générateur de mèmes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}

