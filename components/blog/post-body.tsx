import { useEffect, useRef } from 'react'
import style from '../../styles/markdown-styles.module.scss'
import { useImageModal } from '../ImageModal'

const showdown = require('showdown')
require('showdown-youtube')

const converter = new showdown.Converter({
  tables: true,
  strikethrough: true,
  extensions: ['youtube']
})

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const { openModal, ImageModalComponent } = useImageModal()
  
  const html = converter.makeHtml(content)
  
  useEffect(() => {
    // Add click handlers to all images in the markdown content
    if (contentRef.current) {
      const images = contentRef.current.querySelectorAll('img')
      
      const handleImageClick = (e: MouseEvent) => {
        e.preventDefault()
        const img = e.target as HTMLImageElement
        openModal(img.src, img.alt || '')
      }
      
      images.forEach(img => {
        img.style.cursor = 'pointer'
        img.addEventListener('click', handleImageClick)
      })
      
      // Cleanup
      return () => {
        images.forEach(img => {
          img.removeEventListener('click', handleImageClick)
        })
      }
    }
  }, [html, openModal])
  
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div
          ref={contentRef}
          className={`${style.markdown} post-content`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {ImageModalComponent}
    </>
  )
}

export default PostBody