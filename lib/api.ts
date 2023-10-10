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
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getAllProjects(fields: string[] = []) {
  const slugs = getPostSlugs(projectsDirectory)
  .map((slug) => getPostBySlug(slug, fields, projectsDirectory))
    // sort posts by date in descending order
    // @ts-ignore
    .sort((project1, project2) => (dateFormat(project1.createdDate?.toString()) > dateFormat(project2.createdDate?.toString()) ? -1 : 1))
  return slugs
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
