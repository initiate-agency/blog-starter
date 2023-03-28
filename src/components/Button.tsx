import Link from 'next/link'
import clsx from 'clsx'
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

const baseStyles: Record<ButtonVariant, string> = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors'
}

const variantStyles = {
  solid: {
    primary:
      'relative overflow-hidden bg-primary-700 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-primary-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-primary-900 hover:bg-white/90 active:bg-white/90 active:text-primary-900/70',
    neutral:
      'bg-neutral-800 text-white hover:bg-neutral-900 active:bg-neutral-800 active:text-white/80'
  },
  outline: {
    primary:
      'border-primary-300 text-primary-700 hover:border-primary-400 active:bg-primary-100 active:text-primary-700/80',
    white: 'border-white text-white hover:border-white/80 active:bg-white/80 active:text-white/80',
    neutral:
      'border-neutral-300 text-neutral-700 hover:border-neutral-400 active:bg-neutral-100 active:text-neutral-700/80'
  }
}

type ButtonVariant = 'solid' | 'outline'
type ButtonColor = 'primary' | 'white' | 'neutral'

interface CommonButtonProps {
  variant?: ButtonVariant
  color?: ButtonColor
  className?: string
  children?: ReactNode
}

type ButtonElementProps = CommonButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

type ButtonProps = ButtonElementProps

function Button({ variant = 'solid', color = 'neutral', className, ...props }: ButtonProps) {
  className = clsx(baseStyles[variant], variantStyles[variant][color], className)

  return <button className={className} {...props} />
}

type AnchorElementProps = CommonButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonLinkProps = { href: string } & AnchorElementProps

function isAnchorElement(href: string) {
  return href.startsWith('http') || href.startsWith('mailto') || href.startsWith('www')
}

function ButtonLink({
  variant = 'solid',
  color = 'neutral',
  className,
  href,
  ...props
}: ButtonLinkProps) {
  className = clsx(baseStyles[variant], variantStyles[variant][color], className)

  if (isAnchorElement(href)) {
    return <a href={href} className={className} {...props} />
  }

  return <Link href={href} className={className} {...props} />
}

export { Button, ButtonLink }
