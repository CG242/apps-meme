'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './ShareButton.module.css'

export default function ShareButton({ memeData, memeId, topText, bottomText }) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState('top')
  const containerRef = useRef(null)
  const menuRef = useRef(null)
  
  // Fonction pour obtenir les données du mème (peut être une fonction ou une string)
  const getMemeData = () => {
    return typeof memeData === 'function' ? memeData() : memeData
  }

  // Détecter la position optimale pour le menu
  useEffect(() => {
    if (showShareMenu && containerRef.current && menuRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const menuHeight = menuRef.current.offsetHeight
      const spaceAbove = containerRect.top
      const spaceBelow = window.innerHeight - containerRect.bottom

      // Si pas assez d'espace en haut mais assez en bas, mettre le menu en bas
      if (spaceAbove < menuHeight + 20 && spaceBelow > menuHeight + 20) {
        setMenuPosition('bottom')
      } else {
        setMenuPosition('top')
      }
    }
  }, [showShareMenu])

  // Fonction pour partager sur Twitter
  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${topText || ''} ${bottomText || ''}`.trim() || 'Regardez ce mème !')
    const url = encodeURIComponent(window.location.href)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420')
    setShowShareMenu(false)
  }

  // Fonction pour partager sur Facebook
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420')
    setShowShareMenu(false)
  }

  // Fonction pour partager sur WhatsApp
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${topText || ''} ${bottomText || ''}`.trim() || 'Regardez ce mème !')
    window.open(`https://wa.me/?text=${text}`, '_blank')
    setShowShareMenu(false)
  }

  // Fonction pour copier le lien
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papiers !')
    } catch (err) {
      // Fallback pour les navigateurs plus anciens
      try {
        const textArea = document.createElement('textarea')
        textArea.value = window.location.href
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        textArea.style.top = '-9999px'
        textArea.style.opacity = '0'
        textArea.setAttribute('readonly', '')
        
        if (document.body) {
          document.body.appendChild(textArea)
          textArea.select()
          textArea.setSelectionRange(0, 99999) // Pour mobile
          
          try {
            document.execCommand('copy')
            alert('Lien copié dans le presse-papiers !')
          } catch (copyErr) {
            console.error('Erreur lors de la copie:', copyErr)
            alert('Impossible de copier le lien. Veuillez le copier manuellement.')
          } finally {
            // Toujours essayer de supprimer l'élément avec vérifications supplémentaires
            try {
              if (textArea && document.body && textArea.parentNode === document.body) {
                document.body.removeChild(textArea)
              }
            } catch (removeErr) {
              // Ignorer l'erreur si l'élément n'existe plus
              console.warn('Impossible de supprimer l\'élément:', removeErr)
            }
          }
        } else {
          alert('Impossible de copier le lien. Veuillez le copier manuellement.')
        }
      } catch (fallbackErr) {
        console.error('Erreur lors de la copie:', fallbackErr)
        alert('Impossible de copier le lien. Veuillez le copier manuellement.')
      }
    }
    setShowShareMenu(false)
  }

  // Fonction pour télécharger et partager l'image
  const shareImage = async () => {
    const data = getMemeData()
    if (!data) return
    
    if (navigator.share && data) {
      try {
        // Convertir base64 en blob
        const response = await fetch(data)
        const blob = await response.blob()
        const file = new File([blob], `meme-${memeId}.png`, { type: 'image/png' })
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Mon mème',
            text: `${topText || ''} ${bottomText || ''}`.trim() || 'Regardez ce mème !'
          })
        }
      } catch (err) {
        console.error('Erreur lors du partage:', err)
        // Fallback: télécharger l'image
        const link = document.createElement('a')
        link.download = `meme-${memeId}.png`
        link.href = data
        link.click()
      }
    } else {
      // Fallback: télécharger l'image
      const link = document.createElement('a')
      link.download = `meme-${memeId}.png`
      link.href = data
      link.click()
    }
    setShowShareMenu(false)
  }

  return (
    <div className={styles.shareContainer} ref={containerRef}>
      <button
        className="btn btn-secondary"
        onClick={() => setShowShareMenu(!showShareMenu)}
        aria-label="Partager"
        style={{ width: '100%' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        <span>Partager</span>
      </button>

      {showShareMenu && (
        <>
          <div className={styles.overlay} onClick={() => setShowShareMenu(false)} />
          <div 
            ref={menuRef}
            className={`${styles.shareMenu} ${menuPosition === 'bottom' ? styles.shareMenuBottom : ''}`}
            data-position={menuPosition}
          >
            <div className={styles.shareMenuHeader}>
              <h3>Partager ce mème</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowShareMenu(false)}
                aria-label="Fermer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div className={styles.shareOptions}>
              <button className={styles.shareOption} onClick={shareOnTwitter}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
                <span>Twitter</span>
              </button>

              <button className={styles.shareOption} onClick={shareOnFacebook}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>

              <button className={styles.shareOption} onClick={shareOnWhatsApp}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </button>

              <button className={styles.shareOption} onClick={copyLink}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <span>Copier le lien</span>
              </button>

              {getMemeData() && (
                <button className={styles.shareOption} onClick={shareImage}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>Télécharger & Partager</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
