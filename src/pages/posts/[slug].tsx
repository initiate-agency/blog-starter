import { GetStaticProps, GetStaticPaths } from 'next'
import { getPostBySlug, getPosts, PostOrPage } from '@/cms'

import { Container } from '@/components/Container'

type PostPageProps = {
  post: PostOrPage
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Container>
      <article className="prose lg:prose-xl">
        <h1>{post.title}</h1>
        {post.html && <div dangerouslySetInnerHTML={{ __html: post.html }} />}
      </article>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts()

  const paths =
    posts?.map((post) => ({
      params: { slug: post.slug }
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
  const post = await getPostBySlug(slugString)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}
