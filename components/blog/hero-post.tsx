import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../../interfaces/author'
import styles from '../../styles/HeroPost.module.scss'

type Props = {
  title: string
  coverImage?: string
  date: string
  createdDate: string
  excerpt: string
  author: Author
  tags?: string | string[]
  slug: string
  dir?: string
  featured?: boolean
}

const HeroPost = ({
  title,
  coverImage,
  // date,
  createdDate,
  excerpt,
  // author,
  tags,
  slug,
  dir='blog',
  featured = false
}: Props) => {

  const _tags = Array.isArray(tags) ? tags : tags?.split(",")
  
  return (
    <section className={styles.heroSection}>
      {/* Minimal SVG decoration */}
      <div className={styles.sectionDecoration}>
        <svg width="100%" height="60" viewBox="0 0 800 60" preserveAspectRatio="none">
          <path 
            d="M0,30 Q200,10 400,30 T800,30" 
            stroke="var(--accent-primary)" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.3"
          />
          <circle cx="400" cy="30" r="3" fill="var(--accent-primary)" opacity="0.6"/>
        </svg>
      </div>
      
      <div className={styles.heroCard}>
        {/* Featured or Most Recent Badge */}
        <div className={styles.featuredBadge}>
          <span className={styles.badgeText}>{featured ? 'Featured' : 'Most Recent'}</span>
        </div>
        
        {/* Cover Image with Content Overlay */}
        {coverImage && (
          <div className={styles.heroImage}>
            <CoverImage title={title} src={coverImage} slug={slug} dir={dir}/>
            <div className={styles.imageOverlay}></div>
            
            {/* Content Overlay */}
            <div className={styles.heroContent}>
              <div className={styles.contentInner}>
                {/* Tags */}
                {_tags && _tags.length > 0 && (
                  <div className={styles.heroTags}>
                    {_tags.map((tag, index) => (
                      <span key={index} className={styles.heroTag}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Title */}
                <h3 className={styles.heroTitle}>
                  <Link
                    as={`/${dir}/${slug}`}
                    href={`/${dir}/${slug}`}
                  >
                    <span className={styles.titleText}>{title}</span>
                  </Link>
                </h3>
                
                {/* Date */}
                <div className={styles.heroDate}>
                  <DateFormatter dateString={createdDate} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroPost