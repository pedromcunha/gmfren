import { Grid } from 'components/primitives/Grid'
import { FC, ReactNode, ComponentProps } from 'react'
import { styled } from 'stitches.config'

type Props = ComponentProps<typeof Grid> & {
  children: ReactNode
}

const ButtonGroup: FC<Props> = (props) => {
  const { children, ...gridProps } = props

  return (
    <Grid
      {...gridProps}
      css={{
        gridAutoFlow: 'column',
        columnGap: 1,
        ...gridProps.css,
      }}
    >
      {children}
    </Grid>
  )
}

const ButtonGroupItem = styled('button', {
  outline: 'none',
  $$focusColor: '$colors$gray12',
  '&:focus-visible': {
    boxShadow: '0 0 0 2px $$focusColor',
  },
  '&:first-child': {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  '&:last-child': {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  variants: {
    color: {
      gray3: {
        backgroundColor: '$gray3',
        color: '$gray12',
        '&:hover': {
          backgroundColor: '$gray4',
        },
      },
    },
    size: {
      small: {
        px: '$space$4',
        py: '$space$3',
      },
    },
  },
  defaultVariants: {
    color: 'gray3',
    size: 'small',
  },
})

export { ButtonGroup, ButtonGroupItem }
