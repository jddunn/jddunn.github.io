import Container from '../components/blog/container'
import MoreStories from '../components/blog/more-stories'
import HeroPost from '../components/blog/hero-post'
import Intro from '../components/blog/intro-projects'
import Layout from '../components/blog/layout'
import { getAllProjects } from '../lib/api'
import Post from '../interfaces/post'

import { NextSeo } from 'next-seo'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  const dir = 'projects';
  return (
    <>
      <NextSeo
      title="Johnny's Place - Projects"
      description="Homepage for Johnny Dunn. Projects and works here."
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
              tags={heroPost.tags}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              dir={dir}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} dir={dir} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllProjects([
    'title',
    'date',
    'createdDate',
    'slug',
    'author',
    'tags',
    'coverImage',
    'excerpt',
  ])
  
  return {
    props: { allPosts },
  }
}
