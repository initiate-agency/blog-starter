import { api } from './api'

export async function getAuthors() {
  return await api.authors
    .browse({
      limit: 'all'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getAuthorBySlug(slug: string) {
  return await api.authors
    .read({
      slug
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getAuthorById(id: string) {
  return await api.authors
    .read({
      id
    })
    .catch((err) => {
      console.error(err)
    })
}
