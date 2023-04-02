import Link from 'next/link'
import clsx from 'clsx'

type TagsProps = {
  tags: {
    name: string
    slug: string
  }[]
  className?: string
}

export function Tags({ tags, className }: TagsProps) {
  return (
    <div className={clsx('flex flex-wrap space-x-2', className)}>
      {tags?.map((tag, idx) => (
        <Link
          key={tag.name + idx}
          href={`/tags/${tag.slug}` || ''}
          className="mt-2 rounded-full bg-neutral-50 px-3 py-1.5 font-medium capitalize text-neutral-600 no-underline hover:bg-neutral-100"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}
