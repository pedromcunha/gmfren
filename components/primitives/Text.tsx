import { styled } from 'stitches.config'

export const Text = styled('span', {
  fontFamily: '$body',
  letterSpacing: 0,

  variants: {
    color: {
      gray12: {
        color: '$gray12',
      },
      gray11: {
        color: '$gray11',
      },
      inherit: {
        color: 'inherit',
      },
    },
    style: {
      h2: {
        fontWeight: 700,
        fontSize: 48,
      },
      h4: {
        fontWeight: 700,
        fontSize: 24,
      },
      h5: {
        fontWeight: 700,
        fontSize: 20,
      },
      h6: {
        fontWeight: 700,
        fontSize: 16,
      },
      subtitle1: {
        fontWeight: 500,
        fontSize: 16,
      },
      subtitle2: {
        fontWeight: 500,
        fontSize: 12,
      },
      body1: {
        fontWeight: 400,
        fontSize: 16,
      },
      body2: {
        fontWeight: 400,
        fontSize: 12,
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
  },

  defaultVariants: {
    style: 'body1',
    color: 'gray12',
  },
})
