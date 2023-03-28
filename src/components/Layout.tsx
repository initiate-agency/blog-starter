import clsx from 'clsx'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

type ContainerProps = {
  className?: string
  children: React.ReactNode
}

export function Layout(props: ContainerProps) {
  const { className, children, ...rest } = props

  return (
    <div className={clsx(`${inter.variable} font-sans`, className)} {...rest}>
      {children}
    </div>
  )
}
