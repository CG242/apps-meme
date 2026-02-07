'use client'

import styles from './MemeCard.module.css'
import ShareButton from './ShareButton'

export default function MemeCard({ meme, onDelete, onDownload }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={meme.data} 
          alt={`Mème créé le ${formatDate(meme.createdAt)}`}
          className={styles.memeImage}
        />
        <div className={styles.imageOverlay}>
          <ShareButton 
            memeData={meme.data}
            memeId={meme.id}
            topText={meme.topText}
            bottomText={meme.bottomText}
          />
        </div>
      </div>
      <div className={styles.cardContent}>
        {meme.topText && (
          <p className={styles.textPreview}>
            <span className={styles.label}>Haut:</span> {meme.topText}
          </p>
        )}
        {meme.bottomText && (
          <p className={styles.textPreview}>
            <span className={styles.label}>Bas:</span> {meme.bottomText}
          </p>
        )}
        <p className={styles.date}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {formatDate(meme.createdAt)}
        </p>
      </div>
      <div className={styles.cardActions}>
        <button
          onClick={() => onDownload(meme.data, meme.id)}
          className={styles.actionButton}
          data-variant="primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Télécharger</span>
        </button>
        <button
          onClick={() => onDelete(meme.id)}
          className={styles.actionButton}
          data-variant="danger"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          <span>Supprimer</span>
        </button>
      </div>
    </div>
  )
}

