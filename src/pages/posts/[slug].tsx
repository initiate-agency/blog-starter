/* eslint-disable @next/next/no-img-element */
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPostBySlug, getPostsByTag, getPosts, PostOrPage } from '@/cms'

import { Container } from '@/components/Container'
import { Author } from '@/components/Author'
import { Tags } from '@/components/Tags'
import { SectionHeading } from '@/components/SectionHeading'
import { PostList } from '@/components/PostList'

type PostPageProps = {
  post: PostOrPage
  relatedPosts: PostOrPage[] | null
}

export default function PostPage({ post, relatedPosts }: PostPageProps) {
  const postDate = post.published_at
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(post.published_at))
    : ''

  const postTimeToRead =
    post.reading_time && post.reading_time > 0
      ? `${post.reading_time} min read`
      : 'Less than 1 min read'

  return (
    <article>
      <div className="relative h-[250px] shadow-xl md:h-[400px] lg:h-[500px]">
        <div className="absolute h-full w-full bg-gradient-to-t from-primary-950 to-transparent"></div>
        <div
          className="h-full w-full bg-cover bg-fixed bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.feature_image || ''})` }}
        />
        <Container className="z-10">
          <div className="absolute bottom-8 z-10 text-white lg:bottom-16">
            <Author
              avatarSrc={post.authors?.[0].profile_image || ''}
              avatarAlt={post.authors?.[0].name || ''}
              name={post.authors?.[0].name || ''}
              description={`${postDate} • ${postTimeToRead}`}
              href={`/authors/${post.primary_author?.slug}` || ''}
              darkMode={true}
              className="mb-4 hidden sm:my-8 sm:block"
            />
            <Author
              avatarSrc={post.authors?.[0].profile_image || ''}
              avatarAlt={post.authors?.[0].name || ''}
              name={post.authors?.[0].name || ''}
              description={`${postDate} • ${postTimeToRead}`}
              href={`/authors/${post.primary_author?.slug}` || ''}
              size="sm"
              darkMode={true}
              className="mb-4 sm:mt-8 sm:hidden"
            />
            <h1 className="pr-6 text-3xl font-bold lg:pr-12 lg:text-5xl">{post.title}</h1>
          </div>
        </Container>
      </div>
      <Container className="mt-8 sm:mt-16">
        <div className="prose mx-auto lg:prose-xl">
          {post.html && <div dangerouslySetInnerHTML={{ __html: post.html }} />}
          {post.tags && (
            <div className="mt-8 sm:mt-16">
              <Tags
                tags={post.tags.map((tag) => ({ name: tag.name || '', slug: tag.slug || '' }))}
                className="text-sm no-underline"
              />
            </div>
          )}
        </div>
        {relatedPosts && (
          <div className="mt-16 sm:mt-32">
            <SectionHeading
              title="Keep Reading"
              description={`More posts related to '${post.primary_tag?.name}'`}
            />
            <PostList posts={relatedPosts} />
          </div>
        )}
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

  // fetch related posts by primary tag
  let relatedPosts: PostOrPage[] | null = null

  if (post.tags) {
    const data = await getPostsByTag(post.tags.map((tag) => tag.slug))

    if (data && data.length) {
      // filter and return the first 3
      relatedPosts = data.filter((p) => p.id !== post.id).slice(0, 3)
    }
  }

  return {
    props: {
      post,
      relatedPosts
    }
  }
}
