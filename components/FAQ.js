'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Comment créer un mème en ligne ?",
      answer: "C'est très simple ! Téléchargez une image (JPG ou PNG), ajoutez votre texte en haut et/ou en bas de l'image, personnalisez la taille et la couleur du texte, puis téléchargez votre mème créé."
    },
    {
      question: "Est-ce que le Générateur de Mèmes est gratuit ?",
      answer: "Oui, notre générateur de mèmes est entièrement gratuit ! Vous pouvez créer, personnaliser et télécharger autant de mèmes que vous le souhaitez sans aucun coût."
    },
    {
      question: "Les mèmes exportés ont-ils un watermark ?",
      answer: "Non, absolument pas ! Tous les mèmes que vous créez et téléchargez sont sans watermark. Vous pouvez les utiliser librement et les partager où vous voulez."
    },
    {
      question: "Peux-tu personnaliser des mèmes avec l'éditeur ?",
      answer: "Oui ! Vous pouvez personnaliser complètement vos mèmes : ajouter du texte en haut et en bas, modifier la taille de la police (de 20px à 80px), choisir la couleur du texte, et voir un aperçu en temps réel de vos modifications."
    },
    {
      question: "Quels formats d'image sont supportés ?",
      answer: "Notre générateur de mèmes supporte les formats JPG et PNG. Vous pouvez télécharger une image depuis votre ordinateur et commencer à créer votre mème immédiatement."
    },
    {
      question: "Comment sauvegarder mes mèmes ?",
      answer: "Vos mèmes sont automatiquement sauvegardés dans votre navigateur (localStorage) lorsque vous cliquez sur 'Sauvegarder dans la Galerie'. Vous pouvez ensuite les retrouver dans la section Galerie, les télécharger ou les partager à tout moment."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <span className={styles.faqLabel}>JUSTE LES FAQ</span>
        <h2 className={styles.faqTitle}>Questions fréquentes</h2>
        <p className={styles.faqDescription}>
          Nous avons les réponses aux questions les plus courantes que nos utilisateurs nous posent.
        </p>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`${styles.faqIcon} ${openIndex === index ? styles.faqIconOpen : ''}`}
              >
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            {openIndex === index && (
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

