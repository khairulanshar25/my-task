import { alpha } from '@mui/material/styles'

interface BgBlurProps {
  color?: string
  blur?: number
  opacity?: number
  imgUrl?: string
  important?: boolean
}

/**
 * Generates a CSS-in-JS style object for applying a blurred background effect.
 *
 * If an image URL is provided, the function creates a pseudo-element (`:before`)
 * overlay with a blur and optional color overlay. Otherwise, it applies a blur and
 * color overlay directly to the element.
 *
 * @param props - The properties for configuring the blur effect.
 * @param props.color - The background color to use for the overlay. Defaults to `#000000`.
 * @param props.blur - The blur radius in pixels. Defaults to `6`.
 * @param props.opacity - The opacity of the overlay color. Defaults to `0.8`.
 * @param props.imgUrl - Optional image URL to use as the background.
 * @param props.important - Whether to append `!important` to CSS properties. Defaults to `false`.
 * @returns A style object suitable for use with CSS-in-JS libraries.
 */
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

/**
 * Generates a CSS background style object with a linear gradient, optionally overlaying an image.
 *
 * @param props - The properties for configuring the background gradient and image.
 * @param props.direction - The direction of the gradient (e.g., 'to bottom', 'to right'). Defaults to 'to bottom'.
 * @param props.startColor - The starting color of the gradient.
 * @param props.endColor - The ending color of the gradient.
 * @param props.imgUrl - Optional image URL to overlay beneath the gradient.
 * @param props.color - Fallback color used if startColor or endColor are not provided.
 * @returns An object containing CSS background properties for use in style attributes.
 */
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

/**
 * Generates a CSS-in-JS style object that applies a gradient to text using the specified gradient value.
 *
 * @param value - The CSS gradient value (e.g., "to right, #f00, #00f").
 * @returns An object containing CSS properties for applying a gradient effect to text.
 */
export function textGradient(value: string) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}

/**
 * Generates a CSS style object with the provided filter value,
 * including vendor-prefixed properties for cross-browser compatibility.
 *
 * @param value - The CSS filter value to apply (e.g., "blur(5px)", "grayscale(100%)").
 * @returns An object containing `filter`, `WebkitFilter`, and `MozFilter` properties set to the given value.
 */
export function filterStyles(value: string) {
  return {
    filter: value,
    WebkitFilter: value,
    MozFilter: value,
  }
}

/**
 * CSS-in-JS style object to hide the vertical scrollbar across different browsers.
 *
 * - `msOverflowStyle: 'none'` hides scrollbars in Internet Explorer and Edge.
 * - `scrollbarWidth: 'none'` hides scrollbars in Firefox.
 * - `overflowY: 'hidden'` disables vertical scrolling and hides the scrollbar.
 * - `'&::-webkit-scrollbar': { display: 'none' }` hides scrollbars in WebKit browsers (Chrome, Safari).
 *
 * @example
 * <Box sx={hideScrollbarY}>...</Box>
 */
export const hideScrollbarY = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

/**
 * CSS-in-JS style object to hide the horizontal scrollbar across different browsers.
 *
 * - `msOverflowStyle: 'none'` hides scrollbars in Internet Explorer and Edge.
 * - `scrollbarWidth: 'none'` hides scrollbars in Firefox.
 * - `overflowX: 'hidden'` prevents horizontal scrolling.
 * - `'&::-webkit-scrollbar': { display: 'none' }` hides scrollbars in WebKit browsers (Chrome, Safari).
 *
 * @example
 * <Box sx={hideScrollbarX}>...</Box>
 */
export const hideScrollbarX = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

/**
 * Returns a style object for button color and shadow based on the provided mode.
 *
 * @param mode - The current theme mode, typically 'dark' or another string.
 * @returns An object containing `boxShadow` and `backgroundColor` CSS properties.
 */
export const buttonColor = (mode: string) => ({
  boxShadow:
    '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
  backgroundColor: mode === 'dark' ? '#003892' : '#001e3c',
})

/**
 * Returns a style object containing the default box shadow for button color themes.
 *
 * @returns An object with a `boxShadow` property defining the shadow style.
 */
export const buttonColorTheme = () => ({
  boxShadow:
    '0px 2px 1px -1px rgba(145, 158, 171, 0.2), 0px 1px 1px 0px rgba(145, 158, 171, 0.14), 0px 1px 3px 0px rgba(145, 158, 171, 0.12)',
})
