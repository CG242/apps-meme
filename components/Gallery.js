'use client'

import { useState, useEffect } from 'react'
import MemeCard from './MemeCard'
import styles from './Gallery.module.css'

export default function Gallery() {
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(true)

  // Charger les mèmes depuis localStorage
  useEffect(() => {
    loadMemes()
  }, [])

  const loadMemes = () => {
    try {
      const savedMemes = JSON.parse(localStorage.getItem('memes') || '[]')
      // Trier par date de création (plus récents en premier)
      savedMemes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setMemes(savedMemes)
    } catch (error) {
      console.error('Erreur lors du chargement des mèmes:', error)
      setMemes([])
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour supprimer un mème
  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce mème ?')) {
      const updatedMemes = memes.filter(meme => meme.id !== id)
      localStorage.setItem('memes', JSON.stringify(updatedMemes))
      setMemes(updatedMemes)
    }
  }

  // Fonction pour télécharger un mème
  const handleDownload = (memeData, id) => {
    const link = document.createElement('a')
    link.download = `meme-${id}.png`
    link.href = memeData
    link.click()
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Chargement de la galerie...</p>
      </div>
    )
  }

  if (memes.length === 0) {
    return (
      <div className={styles.empty}>
        <div className="card">
          <h2 style={{ marginBottom: '1rem', color: '#000000' }}>Aucun mème sauvegardé</h2>
          <p style={{ color: '#000000', marginBottom: '1.5rem', opacity: 0.7 }}>
            Créez votre premier mème pour qu'il apparaisse ici !
          </p>
          <a href="/" className="btn btn-primary">
            Créer un Mème
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryHeader}>
        <p className={styles.count}>
          {memes.length} {memes.length === 1 ? 'mème sauvegardé' : 'mèmes sauvegardés'}
        </p>
      </div>
      <div className={styles.galleryGrid}>
        {memes.map((meme) => (
          <MemeCard
            key={meme.id}
            meme={meme}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ))}
      </div>
    </div>
  )
}

