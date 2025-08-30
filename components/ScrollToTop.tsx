import React, { useState, useEffect } from 'react'
import styles from '../styles/ScrollToTop.module.scss'
import { FaChevronUp } from 'react-icons/fa'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.pageYOffset / scrollHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          className={styles.scrollToTop}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg
            className={styles.progressRing}
            width="48"
            height="48"
          >
            <circle
              className={styles.progressRingCircle}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="20"
              cx="24"
              cy="24"
              style={{
                strokeDasharray: `${2 * Math.PI * 20}`,
                strokeDashoffset: `${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`
              }}
            />
          </svg>
          <div className={styles.iconWrapper}>
            <FaChevronUp className={styles.icon} />
          </div>
        </button>
      )}
    </>
  )
}

export default ScrollToTop