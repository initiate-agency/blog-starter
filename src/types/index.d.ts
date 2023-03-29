import { PostsOrPages } from '@tryghost/content-api'

declare global {
  interface Window {
    gtag: any
  }
}

export interface Pagination {
  page: number
  limit: number
  pages: number
  total: number
  next: number | null
  prev: number | null
}

export interface PostsPaginated {
  posts: PostsOrPagesWithMeta
  pagination: Pagination
}

export interface PostsOrPagesWithMeta extends PostsOrPages {
  meta: {
    pagination: Pagination
  }
}
