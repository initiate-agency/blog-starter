/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import Link from 'next/link'

type AuthorProps = {
  avatarSrc: string
  avatarAlt: string
  href: string
  name: string
  description?: string
  className?: string
  size?: 'sm' | 'lg'
  darkMode?: boolean
}

export function Author({
  avatarSrc,
  avatarAlt,
  href,
  name,
  description,
  className,
  size = 'lg',
  darkMode = false
}: AuthorProps) {
  return (
    <Link href={href} className={clsx('group block flex-shrink-0 no-underline', className)}>
      <div className="flex items-center">
        <div>
          <img
            className={clsx(size === 'sm' ? ' h-9 w-9' : ' h-16 w-16', 'inline-block rounded-full')}
            src={avatarSrc}
            alt={avatarAlt}
          />
        </div>
        <div className="ml-3">
          <p
            className={clsx(
              size === 'sm' ? 'text-xs' : 'text-md',
              darkMode
                ? 'text-gray-100 group-hover:text-gray-200'
                : 'text-gray-600 group-hover:text-gray-800',
              'font-medium'
            )}
          >
            {name}
          </p>
          {description && (
            <p
              className={clsx(
                size === 'sm' ? 'text-xs' : 'text-md',
                darkMode
                  ? 'text-gray-200 group-hover:text-gray-300'
                  : 'text-gray-700 group-hover:text-gray-900',
                'font-medium'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
