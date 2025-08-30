import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

// Import constants
import { BLOG_DIR } from './constants'
import { PROJECTS_DIR } from './constants'

const postsDirectory = join(process.cwd(), BLOG_DIR)
const projectsDirectory = join(process.cwd(), PROJECTS_DIR)

export function getPostSlugs(dir = postsDirectory) {
  return fs.readdirSync(dir)
}

export function getPostBySlug(slug: string, fields: string[] = [], fileDir = postsDirectory) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(fileDir, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}


export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs(postsDirectory)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order (most recent first)
    .sort((post1, post2) => {
      // Check if either post is featured
      if (post1.featured && !post2.featured) return -1
      if (!post1.featured && post2.featured) return 1
      
      // If both or neither are featured, sort by date
      const date1 = new Date(post1.date || post1.createdDate)
      const date2 = new Date(post2.date || post2.createdDate)
      return date2.getTime() - date1.getTime()
    })
  return posts
}

export function getAllProjects(fields: string[] = []) {
  const projects = getPostSlugs(projectsDirectory)
    .map((slug) => getPostBySlug(slug, fields, projectsDirectory))
    // sort projects by date in descending order (most recent first)
    .sort((project1, project2) => {
      // Check if either project is featured
      if (project1.featured && !project2.featured) return -1
      if (!project1.featured && project2.featured) return 1
      
      // If both or neither are featured, sort by date
      const date1 = new Date(project1.createdDate || project1.date)
      const date2 = new Date(project2.createdDate || project2.date)
      return date2.getTime() - date1.getTime()
    })
  return projects
}

function dateFormat(str) {
  const date = new Date(str)
  // If str only has year and month, set date to 1
  if (date.getDate() === 1) {
    date.setDate(1)
  }
  // If str only has year, set month and date to 1
  if (date.getMonth() === 0) {
    date.setMonth(0)
    date.setDate(1)
  }
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
