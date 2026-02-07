'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './MemeEditor.module.css'
import ShareButton from './ShareButton'
import FAQ from './FAQ'

export default function MemeEditor() {
  // État de l'image uploadée
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  
  // État des textes
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  
  // Options de personnalisation
  const [topFontSize, setTopFontSize] = useState(40)
  const [bottomFontSize, setBottomFontSize] = useState(40)
  const [topTextColor, setTopTextColor] = useState('#ffffff')
  const [bottomTextColor, setBottomTextColor] = useState('#ffffff')
  
  // Références pour le canvas
  const canvasRef = useRef(null)
  const imageRef = useRef(null)

  // Fonction pour gérer l'upload d'image
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Vérifier le type de fichier
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      alert('Veuillez sélectionner une image JPG ou PNG')
      return
    }

    setUploadedImage(file)
    
    // Créer une URL pour l'image
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageUrl(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Fonction pour dessiner le mème sur le canvas
  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageUrl) return

    const ctx = canvas.getContext('2d')
    const img = imageRef.current

    // Attendre que l'image soit chargée
    if (!img || !img.complete) {
      if (img) {
        img.onload = () => drawMeme()
      }
      return
    }

    // Définir les dimensions du canvas selon l'image
    canvas.width = img.width
    canvas.height = img.height

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dessiner l'image
    ctx.drawImage(img, 0, 0)

    // Configuration du texte
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = topTextColor
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = Math.max(2, topFontSize / 20)
    ctx.font = `bold ${topFontSize}px Impact, Arial Black, sans-serif`

    // Dessiner le texte du haut
    if (topText) {
      const x = canvas.width / 2
      const y = 20
      ctx.strokeText(topText.toUpperCase(), x, y)
      ctx.fillText(topText.toUpperCase(), x, y)
    }

    // Dessiner le texte du bas
    if (bottomText) {
      ctx.fillStyle = bottomTextColor
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = Math.max(2, bottomFontSize / 20)
      ctx.font = `bold ${bottomFontSize}px Impact, Arial Black, sans-serif`
      ctx.textBaseline = 'bottom'
      
      const x = canvas.width / 2
      const y = canvas.height - 20
      ctx.strokeText(bottomText.toUpperCase(), x, y)
      ctx.fillText(bottomText.toUpperCase(), x, y)
    }
  }, [imageUrl, topText, bottomText, topFontSize, bottomFontSize, topTextColor, bottomTextColor])

  // Redessiner le canvas quand quelque chose change
  useEffect(() => {
    drawMeme()
  }, [drawMeme])

  // Fonction pour télécharger le mème
  const downloadMeme = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Créer un lien de téléchargement
    const link = document.createElement('a')
    link.download = `meme-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  // Fonction pour sauvegarder le mème dans localStorage
  const saveMeme = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Convertir le canvas en base64
    const memeData = canvas.toDataURL('image/png')
    
    // Récupérer les mèmes existants
    const savedMemes = JSON.parse(localStorage.getItem('memes') || '[]')
    
    // Créer un nouvel objet mème
    const newMeme = {
      id: Date.now(),
      data: memeData,
      topText: topText,
      bottomText: bottomText,
      createdAt: new Date().toISOString()
    }
    
    // Ajouter le nouveau mème
    savedMemes.push(newMeme)
    
    // Sauvegarder dans localStorage
    localStorage.setItem('memes', JSON.stringify(savedMemes))
    
    alert('Mème sauvegardé dans la galerie !')
  }

  return (
    <div className={styles.editor}>
      {!imageUrl ? (
        /* Mode sans image : Upload centré et grand */
        <div className={styles.uploadCenter}>
          <div className={`card ${styles.uploadCard}`}>
            <h2 className={styles.sectionTitle}>Télécharger une Image</h2>
            <div className={styles.uploadArea}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, marginBottom: '1.5rem' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <label htmlFor="imageUpload" className={styles.uploadLabel}>
                <span className={styles.uploadText}>Cliquez pour télécharger</span>
                <span className={styles.uploadSubtext}>ou glissez-déposez une image</span>
                <span className={styles.uploadFormats}>Formats acceptés: JPG, PNG</span>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className={styles.uploadInput}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Mode avec image : Layout côte à côte */
        <>
          <div className={styles.editorGrid}>
            {/* Zone d'upload réduite */}
            <div className={styles.uploadSide}>
              <div className={`card ${styles.uploadCardSmall}`}>
                <h2 className={styles.sectionTitle}>Image</h2>
                <div className={styles.uploadAreaSmall}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, marginBottom: '0.75rem' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <label htmlFor="imageUploadChange" className={styles.uploadLabelSmall}>
                    <span className={styles.uploadTextSmall}>Changer l'image</span>
                    <span className={styles.uploadSubtextSmall}>JPG, PNG</span>
                  </label>
                  <input
                    id="imageUploadChange"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageUpload}
                    className={styles.uploadInput}
                  />
                </div>
              </div>
            </div>

            {/* Aperçu */}
            <div className={styles.preview}>
              <div className="card">
                <h2 className={styles.sectionTitle}>Aperçu en Temps Réel</h2>
                <div className={styles.canvasContainer}>
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Uploaded"
                    style={{ display: 'none' }}
                  />
                  <canvas
                    ref={canvasRef}
                    className={styles.canvas}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles en bas au centre */}
          <div className={styles.controlsBottom}>
            <div className={styles.controlsGrid}>
              {/* Texte du haut */}
              <div className="card">
                <h2 className={styles.sectionTitle}>Texte du Haut</h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="topText">
                    Contenu
                  </label>
                  <input
                    id="topText"
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Entrez le texte du haut"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="topFontSize">
                    Taille: <span className="range-value">{topFontSize}px</span>
                  </label>
                  <input
                    id="topFontSize"
                    type="range"
                    min="20"
                    max="80"
                    value={topFontSize}
                    onChange={(e) => setTopFontSize(Number(e.target.value))}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="topTextColor">
                    Couleur
                  </label>
                  <input
                    id="topTextColor"
                    type="color"
                    value={topTextColor}
                    onChange={(e) => setTopTextColor(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Texte du bas */}
              <div className="card">
                <h2 className={styles.sectionTitle}>Texte du Bas</h2>
                <div className="form-group">
                  <label className="form-label" htmlFor="bottomText">
                    Contenu
                  </label>
                  <input
                    id="bottomText"
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Entrez le texte du bas"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="bottomFontSize">
                    Taille: <span className="range-value">{bottomFontSize}px</span>
                  </label>
                  <input
                    id="bottomFontSize"
                    type="range"
                    min="20"
                    max="80"
                    value={bottomFontSize}
                    onChange={(e) => setBottomFontSize(Number(e.target.value))}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="bottomTextColor">
                    Couleur
                  </label>
                  <input
                    id="bottomTextColor"
                    type="color"
                    value={bottomTextColor}
                    onChange={(e) => setBottomTextColor(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="card">
                <h2 className={styles.sectionTitle}>Actions</h2>
                <div className={styles.actionsGrid}>
                  <button
                    onClick={downloadMeme}
                    className="btn btn-primary"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>Télécharger</span>
                  </button>
                  <button
                    onClick={saveMeme}
                    className="btn btn-secondary"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    <span>Sauvegarder</span>
                  </button>
                  <ShareButton 
                    memeData={() => canvasRef.current?.toDataURL('image/png')}
                    memeId={Date.now()}
                    topText={topText}
                    bottomText={bottomText}
                  />
                </div>
              </div>
            </div>
          </div>

        </>
      )}

      {/* FAQ Section - En bas */}
      <FAQ />
    </div>
  )
}

