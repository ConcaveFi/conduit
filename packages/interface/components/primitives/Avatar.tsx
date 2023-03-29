import { VariantProps } from 'class-variance-authority'
import { twJoin } from 'tailwind-merge'
import { avatarStyles } from '../../styles/primitives/avatarSyles'

export const Avatar = ({
  variant,
  className = '',
  size,
  children,
  onClick,
}: {
  children?: JSX.Element
  className?: string
  onClick?: () => void
} & VariantProps<typeof avatarStyles>) => {
  const _styles = avatarStyles({ variant, size })
  return (
    <>
      <div
        onClick={onClick}
        className={twJoin(
          `flex transform items-center justify-center rounded-full shadow-lg outline-offset-0 transition-transform active:scale-x-75`,
          _styles,
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}
