import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../../interfaces/author'

type Props = {
  title: string
  coverImage?: string
  date?: string
  createdDate: string
  excerpt: string
  author?: Author
  tags?: string
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
  const _tags = tags ? tags.split(",") : []
  
  return (
    <div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/${dir}/${slug}`}
          href={`/${dir}/${slug}`}
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>

      <div className="text-lg mb-1 text-slate-400 mt-2 m-4 ml-8 tracking-widest">
        <DateFormatter dateString={createdDate} />
      </div>
      
      {coverImage && (
        <div className="mt-5 mb-0">
          <CoverImage slug={slug} title={title} src={coverImage} dir={dir}/>
        </div>
      )}

      {_tags && _tags.length > 0 && (
        <div className="text-sm text-slate-500 mb-3 mt-2 text-center">
          {_tags.map((tag, index) => (
            <span key={index} className="mr-3 underline">
              {tag}
            </span>
          ))}
          </div>
      )}
      <p className="text-lg leading-relaxed mb-4 ml-8 mr-4">{excerpt}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  )
}

export default PostPreview;