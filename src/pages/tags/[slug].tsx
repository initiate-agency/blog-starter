import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { getTagBySlug, getPostsByTag, getTags, Tag, PostsOrPages } from '@/cms'

import { Container } from '@/components/Container'

type TagPageProps = {
  tag: Tag
  posts: PostsOrPages
}

export default function TagPage({ tag, posts }: TagPageProps) {
  return (
    <Container>
      <article className="prose lg:prose-xl">
        <h1>{tag.name}</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </article>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getTags()

  const paths =
    tags?.map((tag) => ({
      params: { slug: tag.slug }
    })) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  if (!slug) {
    return {
      notFound: true
    }
  }

  const slugString = Array.isArray(slug) ? slug[0] : slug
  const tag = await getTagBySlug(slugString)

  if (!tag) {
    return {
      notFound: true
    }
  }

  const posts = await getPostsByTag([tag.slug])

  return {
    props: {
      tag,
      posts
    }
  }
}
