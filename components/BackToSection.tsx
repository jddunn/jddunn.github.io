import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import styles from '../styles/BackToSection.module.scss'

const BackToSection: React.FC = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  const isProject = router.pathname.includes('/projects/')
  const isBlog = router.pathname.includes('/blog/')
  const label = isProject ? 'Projects' : isBlog ? 'Blog' : ''
  const path = isProject ? '/projects' : isBlog ? '/blog' : '/'

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.pageYOffset > 100 || true)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!label) return null

  return (
    <button
      className={`${styles.backToSection} ${isVisible ? styles.visible : ''}`}
      onClick={() => router.push(path)}
      aria-label={`Back to ${label}`}
      title={`Back to ${label}`}
    >
      <BsArrowLeftCircleFill className={styles.icon} />
      <span className={styles.text}>Back to {label}</span>
    </button>
  )
}

export default BackToSection
