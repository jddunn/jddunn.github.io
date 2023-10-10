import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/blog/container'
import PostBody from '../../components/blog/post-body'
import Header from '../../components/blog/header'
import PostHeader from '../../components/blog/post-header'
import Layout from '../../components/blog/layout'
import { getAllPosts, getPostBySlug } from '../../lib/api'
import PostTitle from '../../components/blog/post-title'
import { BLOG_DIR } from '../../lib/constants'
import PostType from '../../interfaces/post'
// import markdownToHtml from '../../lib/markdownToHtml'

import { NextSeo } from 'next-seo'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, 
  // morePosts, 
  preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const title = `${post.title}` || `Johnny's Place - Blog`
  const descr = `${post.excerpt}` || `Place for Johnny Dunn. Blog here.`
  return (
    <>
    <NextSeo
      title={title}
      description={descr}
    />
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                createdDate={post.createdDate}
                author={post.author}
                tags={post.tags}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
    </>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticPaths() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'createdDate',
    'slug',
    'author',
    'tags',
    'coverImage',
    'excerpt',
  ])
  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }))
  // { fallback: false } means other routes should 404
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'createdDate',
    'slug',
    'author',
    'tags',
    'content',
    'ogImage',
    'coverImage',
  ], BLOG_DIR)
  // const content = await markdownToHtml(post.content || '')

  const content = post.content || '';

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}
