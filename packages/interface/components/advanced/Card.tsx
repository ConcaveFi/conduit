import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { ContainerProps, containerStyles, Flex, flexStyles } from '../primitives'

export const cardStyles = cva(cva('shadow-xl rounded-lg')(), {
  variants: {
    variant: {
      primary: 'bg-ocean-800 border-2 border-ocean-400',
      'primary.clean': 'bg-ocean-800',
      secondary: 'bg-ocean-500 border-2 border-ocean-300 border-opacity-60',
      'secondary.clean': 'bg-ocean-500 ',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type CardAttributes = VariantProps<typeof cardStyles>
export interface CardProps extends CardAttributes, ContainerProps {}
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    column,
    grow,
    row,
    justify,
    align,
    centered,
    space,
    expand,
    variant,
    className,
    ...rest
  } = props
  const _flexStyles = flexStyles({ align, centered, column, grow, justify, row })
  const _containerStyles = containerStyles({ expand, space })
  const _cardStyles = cardStyles({ className, variant })
  const _styles = `${_flexStyles} ${_containerStyles} ${_cardStyles}`
  return <Flex ref={ref} {...rest} className={_styles}></Flex>
}) as React.FC<CardProps>
