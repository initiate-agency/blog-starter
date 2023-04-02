/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { PostsOrPages, PostOrPage } from '@/cms'

import { Author } from '@/components/Author'

type BlogListProps = {
  posts: PostsOrPages | PostOrPage[] | []
  show?: number
}

export function PostList({ posts, show }: BlogListProps) {
  const renderPosts = () => {
    let postList = posts

    if (show) {
      postList = postList.slice(0, show)
    }

    return postList.map((post) => (
      <article key={post.id} className="flex flex-col items-start justify-between">
        <div className="relative w-full">
          <Link href={`/posts/${post.slug}`}>
            <img
              src={post.feature_image || ''}
              alt=""
              className="aspect-[16/9] w-full rounded-2xl bg-neutral-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-neutral-900/10" />
          </Link>
        </div>
        <div className="max-w-xl">
          <div className="mt-8 flex items-center gap-x-4 text-xs">
            <time dateTime={post.published_at || ''} className="text-neutral-500">
              {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US') : ''}
            </time>
            {post.primary_tag && (
              <Link
                href={`tags/${post.primary_tag.slug}` || ''}
                className="relative z-10 rounded-full bg-neutral-50 px-3 py-1.5 font-medium text-neutral-600 hover:bg-neutral-100"
              >
                {post.primary_tag.name}
              </Link>
            )}
          </div>
          <div className="group relative">
            <h3 className="mt-3 line-clamp-1 text-lg font-semibold leading-6 text-neutral-900 group-hover:text-neutral-600">
              <Link href={`/posts/${post.slug}`}>
                <span className="absolute inset-0 truncate" />
                {post.title}
              </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-600">
              {post.custom_excerpt || post.excerpt || ''}
            </p>
          </div>
          <Author
            avatarSrc={post.primary_author?.profile_image || ''}
            avatarAlt={post.primary_author?.name || ''}
            name={post.primary_author?.name || ''}
            href={`/authors/${post.primary_author?.slug}`}
            size="sm"
            className="mt-4"
          />
        </div>
      </article>
    ))
  }

  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {renderPosts()}
    </div>
  )
}
