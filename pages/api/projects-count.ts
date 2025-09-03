import { NextApiRequest, NextApiResponse } from 'next'
import { getProjectsCount } from '../../lib/api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const count = getProjectsCount()
  res.status(200).json({ count })
}