import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../../interfaces/author'

type Props = {
  title: string
  coverImage?: string
  date: string
  createdDate: string
  excerpt: string
  author: Author
  tags?: string
  slug: string
  dir?: string
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
  dir='blog'
}: Props) => {

  const _tags = tags?.split(",")
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {coverImage && (
          <CoverImage title={title} src={coverImage} slug={slug} dir={dir}/>
        )}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-2xl lg:text-3xl leading-tight">
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
          {_tags && _tags.length > 0 && (
          <div className="text-sm text-slate-500 mb-4 text-center">
            {_tags.map((tag, index) => (
              <span key={index} className="mr-3 underline">
                {tag}
              </span>
            ))}
            </div>
          )}
          <div className="mt-2 mb-4 md:mb-0 text-md text-gray-300">
            {excerpt}
          </div>
          {tags && tags.length > 0 && (
          <div className="text-sm text-slate-500 mb-4">
          
          </div>
        )}

        </div>
        {/* <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
      </div>
    </section>
  )
}

export default HeroPost
