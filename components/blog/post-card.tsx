import DateFormatter from './date-formatter'

import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../../interfaces/author'

type Props = {
  title: string
  coverImage?: string
  date: string
  excerpt: string
  author: Author
  slug: string
  dir?: string
}

const PostCard = ({
  title,
  coverImage,
  date,
  excerpt,
//   author,
  slug,
  dir='blog'
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        {coverImage && (
        <CoverImage slug={slug} title={title} src={coverImage} dir={dir}/>
        )}
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/${dir}/${slug}`}
          href={`/${dir}/${slug}`}
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  )
}

export default PostCard
