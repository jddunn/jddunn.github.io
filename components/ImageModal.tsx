import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/ImageModal.module.scss'

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

const ImageModal = ({ src, alt, isOpen, onClose }: ImageModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />
          
          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={styles.modalContent}>
              {/* Close button */}
              <button className={styles.closeButton} onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              {/* Image */}
              <div className={styles.imageWrapper}>
                <img src={src} alt={alt} className={styles.image} />
              </div>
              
              {/* Caption */}
              {alt && (
                <div className={styles.caption}>
                  {alt}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook to use with markdown images
export const useImageModal = () => {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null)
  
  const openModal = (src: string, alt: string) => {
    setModalImage({ src, alt })
  }
  
  const closeModal = () => {
    setModalImage(null)
  }
  
  return {
    modalImage,
    openModal,
    closeModal,
    ImageModalComponent: modalImage ? (
      <ImageModal
        src={modalImage.src}
        alt={modalImage.alt}
        isOpen={!!modalImage}
        onClose={closeModal}
      />
    ) : null
  }
}

export default ImageModal