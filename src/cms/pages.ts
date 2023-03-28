import { api } from './api'

export async function getPages() {
  return await api.pages
    .browse({
      limit: 'all'
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPageBySlug(slug: string) {
  return await api.pages
    .read({
      slug
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getPageById(id: string) {
  return await api.pages
    .read({
      id
    })
    .catch((err) => {
      console.error(err)
    })
}
