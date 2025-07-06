import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { Theme, ThemeOptions } from '@mui/material/styles'
import customShadows from './customShadows'
import palette, {
  darkBackground,
  darkText,
  lightBackground,
  lightText,
} from './palette'
import shadows from './shadows'
import typography from './typography'
import componentsOverride from './overrides'
import createCache from '@emotion/cache'

/**
 * Generates a Material-UI theme and emotion cache configured for use within a shadow DOM context.
 *
 * @param shadowRootElement - The root HTMLElement of the shadow DOM where components will be rendered.
 * @param shadowContainer - The container for emotion's style injection, typically the shadow root or an HTMLElement.
 * @param mode - The color mode for the theme, either 'light' or 'dark'.
 * @returns A tuple containing the configured Material-UI Theme and the emotion cache.
 *
 * @remarks
 * - Applies custom palette, typography, shadows, and component overrides based on the selected mode.
 * - Ensures all Material-UI components use the provided shadow root as their container for popper/portal elements.
 * - Resets the global body padding, margin, and border to zero.
 */
const Config = (
  shadowRootElement: HTMLElement,
  shadowContainer: ShadowRoot | HTMLElement,
  mode: 'light' | 'dark',
) => {
  const cache = createCache({
    key: 'css',
    prepend: true,
    container: shadowContainer,
  })
  const background = mode === 'dark' ? darkBackground : lightBackground
  const text = mode === 'dark' ? darkText : lightText
  const config = {
    palette: { ...palette, ...background, ...text, mode },
    shape: { borderRadius: 6 },
    typography,
    shadows: shadows(),
    customShadows: customShadows(),
  }
  const theme: Theme = createTheme(config as unknown as ThemeOptions)
  theme.components = componentsOverride(responsiveFontSizes(theme))
  if (theme.components) {
    Object.keys(theme.components).forEach((key: string) => {
      if (theme.components) {
        ;(theme.components as Record<string, any>)[key].defaultProps = {
          container: shadowRootElement,
        }
      }
    })
  }
  const rest = [
    'MuiToolbar',
    'MuiBox',
    'MuiStack',
    'MuiAppBar',
    'MuiCircularProgress',
    'MuiCollapse',
    'MuiContainer',
    'MuiDialog',
    'MuiDialogActions',
    'MuiDialogContent',
    'MuiDialogContentText',
    'MuiDialogTitle',
    'palette',
    'MuiPalette',
    'MuiDrawer',
    'MuiSvgIcon',
    'MuiButtonBase',
    'MuiSwipeableDrawer',
    'MuiIconButton',
    'MuiFilledInput',
    'MuiImageList',
    'MuiImageListItem',
    'MuiImageListItemBar',
    'MuiFormGroup',
    'MuiFormHelperText',
    'MuiChip',
    'MuiDivider',
    'MuiTooltip',
    'MuiFab',
    'MuiInputAdornment',
    'MuiGrid',
    'MuiInput',
    'MuiInputBase',
    'MuiFormLabel',
    'MuiInputLabel',
    'MuiListItem',
    'MuiListItemAvatar',
    'MuiListItemButton',
    'MuiListItemIcon',
    'MuiListItemText',
    'MuiListSubheader',
    'MuiListItemSecondaryAction',
    'MuiMasonry',
    'MuiLoadingButton',
    'MuiLinearProgress',
    'MuiLink',
    'MuiModal',
    'MuiPagination',
    'MuiPaginationItem',
    'MuiPopover',
    'MuiNativeSelect',
    'MuiMobileStepper',
    'MuiList',
    'MuiTimeline',
    'MuiTimelineConnector',
    'MuiTimelineContent',
    'MuiTimelineDot',
    'MuiTimelineItem',
    'MuiTimelineOppositeContent',
    'MuiTimelineSeparator',
    'MuiTextField',
    'MuiFormControl',
    'MuiTouchRipple',
    'MuiToggleButton',
    'MuiToggleButtonGroup',
    'MuiPopper',
    'MuiRadio',
    'MuiRadioGroup',
    'MuiSelect',
    'MuiSlider',
    'MuiSnackbar',
    'MuiSnackbarContent',
    'MuiSpeedDial',
    'MuiSpeedDialAction',
    'MuiSpeedDialIcon',
    'MuiSwitch',
    'MuiStep',
    'MuiStepButton',
    'MuiStepConnector',
    'MuiStepContent',
    'MuiStepLabel',
    'MuiStepper',
    'MuiStepIcon',
    'MuiTab',
    'MuiTabs',
    'MuiTabScrollButton',
    'MuiTable',
    'MuiTableBody',
    'MuiTableCell',
    'MuiTableContainer',
    'MuiTableHead',
    'MuiTablePagination',
    'MuiTableRow',
    'MuiTableFooter',
    'MuiTableSortLabel',
    'MuiTypography',
    'MuiTabList',
    'MuiTabPanel',
    'MuiMenu',
    'MuiMenuItem',
    'Mui',
    'MuiAutocomplete',
    'MuiPaper',
    'MuiCard',
    'MuiOutlinedInput',
    'MuiAccordion',
    'MuiAccordionSummary',
    'MuiAccordionDetails',
    'MuiAlert',
    'MuiRating',
    'MuiScopedCssBaseline',
    'MuiAlertTitle',
    'MuiAlertAction',
    'MuiSkeleton',
    'MuiBadge',
    'MuiButton',
    'MuiButtonGroup',
    'MuiAvatar',
    'MuiCardActionArea',
    'MuiAvatarGroup',
    'MuiCardActions',
    'MuiCardContent',
    'MuiCardHeader',
    'MuiCardMedia',
    'MuiBackdrop',
    'MuiCssBaseline',
    'MuiIcon',
    'MuiBottomNavigation',
    'MuiBottomNavigationAction',
    'MuiBreadcrumbs',
    'MuiCheckbox',
  ]
  rest.forEach((key) => {
    if (theme.components && !(theme.components as Record<string, any>)[key]) {
      theme.components = {
        ...(theme.components as Record<string, any>),
        [key]: {
          defaultProps: {
            container: shadowRootElement,
          },
        },
      }
    }
  })
  document.body.style.padding = '0px'
  document.body.style.margin = '0px'
  document.body.style.border = '0px'
  return [theme, cache]
}

export default Config
