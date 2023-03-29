import { PostsPaginated } from '@/cms'

// The Ghost API can't be called from client side because the API keys.
// Use this proxy when requesting client side.
export async function getPostsPaginated(page?: number, limit?: number) {
  const response = await fetch(`/api/posts?page=${page}&limit=${limit}`)
  const fetchedPosts: PostsPaginated = await response.json()

  return fetchedPosts
}
