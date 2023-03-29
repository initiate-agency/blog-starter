/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { PostsOrPages } from '@/cms'

type BlogListProps = {
  posts: PostsOrPages | []
}

export function PostList({ posts }: BlogListProps) {
  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
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
                  className="relative z-10 rounded-full bg-neutral-50 py-1.5 px-3 font-medium text-neutral-600 hover:bg-neutral-100"
                >
                  {post.primary_tag.name}
                </Link>
              )}
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-neutral-900 line-clamp-1 group-hover:text-neutral-600">
                <Link href={`/posts/${post.slug}`}>
                  <span className="absolute inset-0 truncate" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-5 text-sm leading-6 text-neutral-600 line-clamp-3">
                {post.custom_excerpt || post.excerpt || ''}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <img
                src={post.primary_author?.profile_image || ''}
                alt=""
                className="h-10 w-10 rounded-full bg-neutral-100"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-neutral-900">
                  <Link href={`/authors/${post.primary_author?.slug}`}>
                    <span className="absolute inset-0" />
                    {post.primary_author?.name}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
