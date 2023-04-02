import { api } from './api'

export async function getPosts(page?: number, limit?: number) {
  return await api.posts
    .browse({
      limit: limit ? limit : 'all',
      page: page ? page : 1,
      include: ['tags', 'authors']
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPostsByTag(tags: string[]) {
  return await api.posts
    .browse({
      limit: 'all',
      include: ['tags', 'authors'],
      filter: `tags:[${tags.join(',')}]`
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPostBySlug(slug: string) {
  return await api.posts
    .read(
      {
        slug
      },
      {
        include: ['tags', 'authors']
      }
    )
    .catch((err) => {
      console.error(err)
    })
}

export async function getPostById(id: string) {
  return await api.posts
    .read({
      id
    })
    .catch((err) => {
      console.error(err)
    })
}
