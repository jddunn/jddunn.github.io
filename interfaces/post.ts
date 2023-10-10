import type Author from './author'

type PostType = {
  slug: string
  title: string
  date: string
  createdDate: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  dir?: string
  tags?: string
}

export default PostType
