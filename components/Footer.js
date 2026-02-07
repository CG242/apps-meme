'use client'

import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Outils de Mèmes</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Créateur de Mèmes</Link></li>
              <li><Link href="/gallery">Galerie de Mèmes</Link></li>
              <li><Link href="/">Générateur de Mèmes</Link></li>
              <li><Link href="/">Éditeur de Mèmes</Link></li>
              <li><Link href="/">Templates de Mèmes</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Outils d'Image</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Redimensionneur d'image</Link></li>
              <li><Link href="/">Compresseur d'images</Link></li>
              <li><Link href="/">Recadrer l'image</Link></li>
              <li><Link href="/">Retourner l'image</Link></li>
              <li><Link href="/">Faire pivoter l'image</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Convertir</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Convertisseur d'images</Link></li>
              <li><Link href="/">JPG vers PNG</Link></li>
              <li><Link href="/">PNG vers JPG</Link></li>
              <li><Link href="/">WebP en JPG</Link></li>
              <li><Link href="/">HEIC en JPG</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Ressources</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Guide de création</Link></li>
              <li><Link href="/">Tutoriels</Link></li>
              <li><Link href="/">FAQ</Link></li>
              <li><Link href="/">Blog</Link></li>
              <li><Link href="/">Exemples</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>À propos</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Nous contacter</Link></li>
              <li><Link href="/">Mentions légales</Link></li>
              <li><Link href="/">Confidentialité</Link></li>
              <li><Link href="/">Conditions d'utilisation</Link></li>
              <li><Link href="/">Politique de cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Générateur de Mèmes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

