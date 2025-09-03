import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/ImageModal.module.scss'

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

const ImageModal = ({ src, alt, isOpen, onClose }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isOpen && e.ctrlKey) {
        e.preventDefault()
        const delta = e.deltaY > 0 ? 0.9 : 1.1
        setZoom(prev => Math.min(Math.max(0.5, prev * delta), 5))
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('wheel', handleWheel)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])
  
  const handleZoomIn = () => setZoom(prev => Math.min(5, prev + 0.25))
  const handleZoomOut = () => setZoom(prev => Math.max(0.5, prev - 0.25))
  const handleZoomReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }
  const handleZoomFit = () => {
    if (imageRef.current) {
      const img = imageRef.current
      const container = img.parentElement
      if (container) {
        const scaleX = container.clientWidth / img.naturalWidth
        const scaleY = container.clientHeight / img.naturalHeight
        setZoom(Math.min(scaleX, scaleY) * 0.9)
        setPosition({ x: 0, y: 0 })
      }
    }
  }
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      })
    }
  }
  
  const handleMouseUp = () => setIsDragging(false)

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
              <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              {/* Zoom Controls */}
              <div className={styles.zoomControls}>
                <button onClick={handleZoomOut} disabled={zoom <= 0.5} aria-label="Zoom out">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 9h10v2H5z"/>
                  </svg>
                </button>
                <button onClick={handleZoomReset} aria-label="Reset zoom">
                  <span>{Math.round(zoom * 100)}%</span>
                </button>
                <button onClick={handleZoomIn} disabled={zoom >= 5} aria-label="Zoom in">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 5v4H5v2h4v4h2v-4h4V9h-4V5H9z"/>
                  </svg>
                </button>
                <button onClick={handleZoomFit} aria-label="Fit to screen">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3v4h1V4h3V3H2zm12 0v1h3v3h1V3h-4zM3 13H2v4h4v-1H3v-3zm13 0v3h-3v1h4v-4h-1z"/>
                  </svg>
                </button>
              </div>
              
              {/* Image */}
              <div 
                className={styles.imageWrapper}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
              >
                <img 
                  ref={imageRef}
                  src={src} 
                  alt={alt} 
                  className={styles.image}
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease'
                  }}
                  draggable={false}
                />
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