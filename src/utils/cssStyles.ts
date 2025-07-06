import { alpha } from '@mui/material/styles'

interface BgBlurProps {
  color?: string
  blur?: number
  opacity?: number
  imgUrl?: string
  important?: boolean
}

export function bgBlur(props: BgBlurProps) {
  const color = props?.color || '#000000'
  const blur = props?.blur || 6
  const opacity = props?.opacity || 0.8
  const imgUrl = props?.imgUrl
  const important = props?.important || false

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)${important ? '!important' : ''}`,
        WebkitBackdropFilter: `blur(${blur}px))${important ? '!important' : ''}`,
        backgroundColor: `${alpha(color, opacity)}${important ? '!important' : ''}`,
      },
    }
  }

  return {
    backdropFilter: `blur(${blur}px)${important ? '!important' : ''}`,
    WebkitBackdropFilter: `blur(${blur}px))${important ? '!important' : ''}`,
    backgroundColor: `${alpha(color, opacity)}${important ? '!important' : ''}`,
  }
}

interface BgGradientProps {
  direction?: string
  startColor?: string
  endColor?: string
  imgUrl?: string
  color?: string
}

export function bgGradient(props: BgGradientProps) {
  const direction = props?.direction || 'to bottom'
  const startColor = props?.startColor
  const endColor = props?.endColor
  const imgUrl = props?.imgUrl
  const color = props?.color

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${
        endColor || color
      }), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    }
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  }
}

export function textGradient(value: string) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}

export function filterStyles(value: string) {
  return {
    filter: value,
    WebkitFilter: value,
    MozFilter: value,
  }
}

export const hideScrollbarY = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

export const hideScrollbarX = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

export const buttonColor = (mode: string) => ({
  boxShadow:
    '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
  backgroundColor: mode === 'dark' ? '#003892' : '#001e3c',
})

export const buttonColorTheme = () => ({
  boxShadow:
    '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
})
