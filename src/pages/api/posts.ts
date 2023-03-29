import type { NextApiRequest, NextApiResponse } from 'next'
import { PostsOrPagesWithMeta, PostsPaginated, getPosts } from '@/cms'

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostsPaginated>) {
  const { query } = req

  const page = Array.isArray(query.page) ? Number(query.page[0]) : Number(query.page)
  const limit = Array.isArray(query.limit) ? Number(query.limit[0]) : Number(query.limit)

  const posts = (await getPosts(page, limit)) as PostsOrPagesWithMeta
  const pagination = posts.meta.pagination

  if (!posts) {
    return res.status(404)
  }

  res.status(200).json({
    posts,
    pagination
  })
}
