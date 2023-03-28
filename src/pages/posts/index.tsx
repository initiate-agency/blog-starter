import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getPosts, PostsOrPages } from '@/cms'

import { Container } from '@/components/Container'

type PostsPageProps = {
  posts: PostsOrPages
}

export default function PostsPage({ posts }: PostsPageProps) {
  return (
    <Container>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = await getPosts()

  if (!posts) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      posts
    }
  }
}
