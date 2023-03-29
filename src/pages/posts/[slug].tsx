/* eslint-disable @next/next/no-img-element */
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPostBySlug, getPosts, PostOrPage } from '@/cms'

import { Container } from '@/components/Container'

type PostPageProps = {
  post: PostOrPage
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <article>
      <Container className="prose my-8 lg:prose-xl sm:my-12">
        <h1>{post.title}</h1>
      </Container>
      <div
        className="h-[250px] w-full bg-cover bg-fixed bg-center bg-no-repeat shadow-lg ring-1 ring-neutral-900/10 md:h-[400px] lg:h-[500px]"
        style={{ backgroundImage: `url(${post.feature_image || ''})` }}
      ></div>
      <Container className="prose my-8 lg:prose-xl sm:my-12">
        <time dateTime={post.published_at || ''} className="italic text-neutral-500">
          Published on{' '}
          {post.published_at
            ? new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).format(new Date(post.published_at))
            : ''}
        </time>
        <div className="prose lg:prose-xl">
          {post.html && <div dangerouslySetInnerHTML={{ __html: post.html }} />}
        </div>
      </Container>
    </article>
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
