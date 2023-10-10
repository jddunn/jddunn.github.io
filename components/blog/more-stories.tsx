import PostPreview from './post-preview'
import type Post from '../../interfaces/post'

type Props = {
  posts: Post[]
  dir?: string
}

const MoreStories = ({ posts, dir='blog' }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-1xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">
        {/* More Stories */}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            createdDate={post.createdDate}
            author={post.author}
            tags={post.tags}
            slug={post.slug}
            excerpt={post.excerpt}
            dir={dir}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
