import { twMerge } from 'tailwind-merge'

export const Card = ({
  children,
  className = '',
}: {
  className?: string
  children: JSX.Element[] | JSX.Element
}) => {
  return (
    <div
      className={twMerge(
        `bg-dark-10 ocean:bg-blue-10 flex h-fit flex-col gap-4 rounded-xl p-4 `,
        className,
      )}
    >
      {children}
    </div>
  )
}
