import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../../interfaces/author'
import styles from '../../styles/PostPreview.module.scss'

type Props = {
  title: string
  coverImage?: string
  date?: string
  createdDate: string
  excerpt: string
  author?: Author
  tags?: string | string[]
  slug: string
  dir?: string
}

const PostPreview = ({
  title,
  coverImage,
  // date,
  createdDate,
  excerpt,
  // author,
  tags,
  slug,
  dir='blog'
}: Props) => {

  // Add null check before calling split
  const _tags = Array.isArray(tags) ? tags : (tags ? tags.split(",") : [])
  
  return (
    <div className={styles.postCard}>
      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>
          <Link
            as={`/${dir}/${slug}`}
            href={`/${dir}/${slug}`}
          >
            {title}
          </Link>
        </h3>

        <div className={styles.postDate}>
          <DateFormatter dateString={createdDate} />
        </div>
        
        {coverImage && (
          <div className={styles.postImage}>
            <CoverImage slug={slug} title={title} src={coverImage} dir={dir}/>
          </div>
        )}

        {_tags && _tags.length > 0 && (
          <div className={styles.postTags}>
            {_tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        
        <p className={styles.postExcerpt}>{excerpt}</p>
        
        <Link
          as={`/${dir}/${slug}`}
          href={`/${dir}/${slug}`}
          className={styles.readMore}
        >
          Read More
          <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </div>
  )
}

export default PostPreview;