import CoverImage from './cover-image'
import type Author from '../../interfaces/author'
import styles from '../../styles/PostHeader.module.scss'
import { useRouter } from "next/router"
import { BsArrowLeftCircleFill } from "react-icons/bs"
import { FaCalendarPlus, FaCalendarCheck, FaLink } from "react-icons/fa"

type Props = {
  title: string
  coverImage: string
  date: string
  createdDate?: string
  tags?: string
  author?: Author
  dir?: string
}

const PostHeader = ({ title, coverImage, date, createdDate, tags, 
   // author,
   dir='blog'}: Props) => {

  const _tags = tags ? tags.split(",") : []
  const router = useRouter()
  
  // Format dates to human readable format
  const formatDate = (dateString: string) => {
    // Parse the date string as local time, not UTC
    // For YYYY-MM-DD format, append time to avoid timezone issues
    const [year, month, day] = dateString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  // Determine the correct back path based on current route
  const getBackPath = () => {
    if (router.pathname.includes('/blog/')) {
      return '/blog'
    } else if (router.pathname.includes('/projects/')) {
      return '/projects'
    }
    return '/'
  }
  
  return (
    <div className={styles.postHeader}>
      {/* Back Button */}
      {router.pathname !== "/" && (
        <div className={styles.backButton}>
          <button 
            onClick={() => router.push(getBackPath())}
            aria-label={`Back to ${dir === 'projects' ? 'Projects' : 'Blog'}`}
            title={`Back to ${dir === 'projects' ? 'Projects' : 'Blog'}`}
          >
            <BsArrowLeftCircleFill />
            <span className={styles.backText}>
              Back to {dir === 'projects' ? 'Projects' : 'Blog'}
            </span>
          </button>
        </div>
      )}
      
      {/* Title with // styling */}
      <div className={styles.titleWrapper}>
        <h1 className={styles.postTitle}>
          <span className={styles.separator}>//</span>
          <span className={styles.titleText}>{title}</span>
        </h1>
      </div>
      
      {/* Meta Information - Dates on one line with icons */}
      <div className={styles.metaInfo}>
        {createdDate && (
          <div className={styles.dateItem}>
            <span className={styles.dateIcon}>
              <FaCalendarPlus />
            </span>
            <span className={styles.dateLabel}>
              {dir === 'projects' ? 'Created' : 'Published'}:
            </span>
            <span className={styles.dateValue}>{formatDate(createdDate)}</span>
          </div>
        )}
        
        {date && (
          <div className={styles.dateItem}>
            <span className={styles.dateIcon}>
              <FaCalendarCheck />
            </span>
            <span className={styles.dateLabel}>Updated:</span>
            <span className={styles.dateValue}>{formatDate(date)}</span>
          </div>
        )}
      </div>
      
      {/* Tags */}
      {_tags && _tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {_tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
      
      {/* Cover Image */}
      {coverImage && (
        <div className={styles.coverImageWrapper}>
          <CoverImage title={title} src={coverImage} dir={dir}/>
        </div>
      )}
    </div>
  )
}

export default PostHeader
