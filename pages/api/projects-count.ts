import { NextApiRequest, NextApiResponse } from 'next'
import { getAllProjects } from '../../lib/api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const projects = getAllProjects(['slug'])
  res.status(200).json({ count: projects.length })
}