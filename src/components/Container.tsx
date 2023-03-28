import clsx from 'clsx'

type ContainerProps = {
  className?: string
  children: React.ReactNode
}

export function Container(props: ContainerProps) {
  const { className, children, ...rest } = props

  return (
    <div className={clsx('mx-auto max-w-7xl bg-white px-4 sm:px-6 lg:px-8', className)} {...rest}>
      {children}
    </div>
  )
}
