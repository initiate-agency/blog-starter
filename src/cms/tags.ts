import { api } from './api'

export async function getTags() {
  return await api.tags
    .browse({
      limit: 'all'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getTagBySlug(slug: string) {
  return await api.tags
    .read({
      slug
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getTagById(id: string) {
  return await api.tags
    .read({
      id
    })
    .catch((err) => {
      console.error(err)
    })
}
