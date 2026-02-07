'use client'

import styles from './HeroSection.module.css'

export default function HeroSection() {
  const handleCreateMeme = () => {
    const uploadInput = document.getElementById('imageUpload')
    if (uploadInput) {
      uploadInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        uploadInput.click()
      }, 500)
    }
  }

  return (
    <div className={styles.heroSection}>
      <img
        className={styles.heroImage}
        src="/images/banner-1.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Générateur et créateur de mèmes</h1>
          <p className={styles.heroSubtitle}>
            Crée des mèmes à partir d'images, de vidéos et de GIFs gratuitement
          </p>
          <button 
            className={styles.heroButton}
            onClick={handleCreateMeme}
          >
            Créer un Meme
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

