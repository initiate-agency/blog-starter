import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getPosts, Pagination, PostsOrPagesWithMeta, PostsOrPages } from '@/cms'
import { getPostsPaginated } from '@/cms/proxy'

import { Container } from '@/components/Container'
import { Button } from '@/components/Button'

const LIMIT = 12

type PostsPageProps = {
  posts: PostsOrPages
  pagination: Pagination
}

export default function PostsPage({ posts, pagination }: PostsPageProps) {
  const [fetchedPosts, setFetchedPosts] = useState<PostsOrPages | []>(posts)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getPostsPaginated(currentPage, LIMIT)
      setFetchedPosts(fetchedPosts.posts)
      setTotalPages(fetchedPosts.pagination.pages)
    }

    fetchPosts()
  }, [currentPage, pagination.pages])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <Container>
      <h1>Posts</h1>

      <ul>
        {fetchedPosts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
            Page {page}
          </Button>
        ))}
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = (await getPosts(1, LIMIT)) as PostsOrPagesWithMeta
  const pagination = posts.meta.pagination

  if (!posts) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      posts,
      pagination
    }
  }
}
