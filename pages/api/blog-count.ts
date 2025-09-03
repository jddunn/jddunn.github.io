import { NextApiRequest, NextApiResponse } from 'next'
import { getBlogCount } from '../../lib/api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const count = getBlogCount()
  res.status(200).json({ count })
}