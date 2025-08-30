import Container from '../components/blog/container'
import MoreStories from '../components/blog/more-stories'
import HeroPost from '../components/blog/hero-post'
import Intro from '../components/blog/intro'
import Layout from '../components/blog/layout'
import { getAllPosts } from '../lib/api'
import Post from '../interfaces/post'
import ScrollToTop from '../components/ScrollToTop'

import { NextSeo } from 'next-seo'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
    <NextSeo
      title="Johnny's Place - Blog"
      description="Place for Johnny Dunn. Blog here."
      />
      <Layout>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              createdDate={heroPost.createdDate}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              featured={heroPost.featured}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
        <ScrollToTop />
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'coverImage',
    'date',
    'createdDate',
    'slug',
    // 'author',
    'coverImage',
    'excerpt',
    'featured',
  ])

  return {
    props: { allPosts },
  }
}
