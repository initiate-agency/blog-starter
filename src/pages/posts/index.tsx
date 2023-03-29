import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { getPosts, Pagination as PaginationType, PostsOrPagesWithMeta, PostsOrPages } from '@/cms'
import { getPostsPaginated } from '@/cms/proxy'
import { useQueryState, queryTypes } from 'next-usequerystate'

import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { Pagination } from '@/components/Pagination'
import { PostList } from '@/components/PostList'

const LIMIT = 12

type PostsPageProps = {
  posts: PostsOrPages
  pagination: PaginationType
}

export default function PostsPage({ posts, pagination }: PostsPageProps) {
  const [fetchedPosts, setFetchedPosts] = useState<PostsOrPages | []>(posts)
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    queryTypes.integer.withDefault(pagination.page)
  )
  const [totalPages, setTotalPages] = useState(pagination.total)
  const [nextPage, setNextPage] = useState<number | null>(pagination.next)
  const [prevPage, setPrevPage] = useState<number | null>(pagination.prev)

  useEffect(() => {
    async function fetchPosts() {
      const fetchedPosts = await getPostsPaginated(currentPage, LIMIT)

      setFetchedPosts(fetchedPosts.posts)
      setTotalPages(fetchedPosts.pagination.pages)
      setNextPage(fetchedPosts.pagination.next)
      setPrevPage(fetchedPosts.pagination.prev)
    }

    fetchPosts()
  }, [currentPage])

  const handlePageChange = (newPage: number | null) => {
    if (newPage === null) {
      return
    }

    setCurrentPage(newPage)
  }

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null
    }

    return (
      <Container>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          handlePageChange={handlePageChange}
        />
      </Container>
    )
  }

  return (
    <main>
      <Container>
        <SectionHeading
          title="From the blog"
          description="Learn how to grow your business with our expert advice."
        />
        <PostList posts={fetchedPosts} />
      </Container>
      {renderPagination()}
    </main>
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
