export type { PostsOrPages, PostOrPage, Authors, Author, Tags, Tag } from '@tryghost/content-api'
export type { PostsOrPagesWithMeta, PostsPaginated, Pagination } from '@/types'
export { api } from './api'
export { getTags, getTagBySlug, getTagById } from './tags'
export { getAuthors, getAuthorBySlug, getAuthorById } from './authors'
export { getPosts, getPostBySlug, getPostById, getPostsByTag } from './posts'
export { getPages, getPageBySlug, getPageById } from './pages'
export { getPostsPaginated } from './proxy'
