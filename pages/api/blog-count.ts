import { NextApiRequest, NextApiResponse } from 'next'
import { getAllPosts } from '../../lib/api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts(['slug'])
  res.status(200).json({ count: posts.length })
}