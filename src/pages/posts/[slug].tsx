/* eslint-disable @next/next/no-img-element */
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPostBySlug, getPosts, PostOrPage } from '@/cms'

import { Container } from '@/components/Container'
import { Author } from '@/components/Author'

type PostPageProps = {
  post: PostOrPage
}

export default function PostPage({ post }: PostPageProps) {
  const postDate = post.published_at
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(post.published_at))
    : ''

  const postTimeToRead = `${post.reading_time} min read`

  return (
    <article>
      <div className="relative h-[250px] shadow-lg ring-1 ring-neutral-900/10 md:h-[400px] lg:h-[500px]">
        <div className="absolute h-full w-full bg-gradient-to-t from-primary-950 to-transparent"></div>
        <div
          className="h-full w-full bg-cover bg-fixed bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.feature_image || ''})` }}
        />
        <Container className="z-10">
          <div className="absolute bottom-8 z-10 text-white lg:bottom-16">
            <h1 className="text-3xl font-bold lg:text-5xl">{post.title}</h1>
            <Author
              avatarSrc={post.authors?.[0].profile_image || ''}
              avatarAlt={post.authors?.[0].name || ''}
              name={post.authors?.[0].name || ''}
              description={`${postDate} • ${postTimeToRead}`}
              href={`/authors/${post.primary_author?.slug}` || ''}
              darkMode={true}
              className="mt-4 hidden sm:mt-8 lg:block"
            />
          </div>
        </Container>
      </div>
      <Container className="mt-8 sm:mt-16">
        <Author
          avatarSrc={post.authors?.[0].profile_image || ''}
          avatarAlt={post.authors?.[0].name || ''}
          name={post.authors?.[0].name || ''}
          description={`${postDate} • ${postTimeToRead}`}
          href={`/authors/${post.primary_author?.slug}` || ''}
          size="sm"
          className="mt-4 sm:mt-8 lg:hidden"
        />
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
