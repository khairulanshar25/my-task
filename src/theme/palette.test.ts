import palette, {
  lightBackground,
  darkBackground,
  lightText,
  darkText,
} from './palette'

// Mock alpha function from @mui/material/styles
vi.mock('@mui/material/styles', () => ({
  alpha: (color: string, opacity: number) =>
    `${color}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, '0')}`,
}))

describe('palette', () => {
  it('should have correct common colors', () => {
    expect(palette.common.black).toBe('#000')
    expect(palette.common.white).toBe('#fff')
  })

  it('should have correct primary color values', () => {
    expect(palette.primary.main).toBe('#2065D1')
    expect(palette.primary.contrastText).toBe('#fff')
  })

  it('should have correct secondary color values', () => {
    expect(palette.secondary.main).toBe('#3366FF')
    expect(palette.secondary.contrastText).toBe('#fff')
  })

  it('should have correct info color values', () => {
    expect(palette.info.main).toBe('#1890FF')
    expect(palette.info.contrastText).toBe('#fff')
  })

  it('should have correct success color values', () => {
    expect(palette.success.main).toBe('#54D62C')
    expect(palette.success.contrastText).toBe('#212B36')
  })

  it('should have correct warning color values', () => {
    expect(palette.warning.main).toBe('#FFC107')
    expect(palette.warning.contrastText).toBe('#212B36')
  })

  it('should have correct error color values', () => {
    expect(palette.error.main).toBe('#FF4842')
    expect(palette.error.contrastText).toBe('#fff')
  })

  it('should have correct grey values', () => {
    expect(palette.grey[0]).toBe('#FFFFFF')
    expect(palette.grey[900]).toBe('#161C24')
  })

  it('should have correct divider color', () => {
    // GREY[500] = '#919EAB', 0.24*255 = 61.2 ~ 3d
    expect(palette.divider).toBe('#919EAB3d')
  })

  it('should have correct action colors', () => {
    expect(palette.action.active).toBe('#637381')
    expect(palette.action.hover).toBe('#919EAB14') // 0.08*255 = 20.4 ~ 14
    expect(palette.action.selected).toBe('#919EAB29') // 0.16*255 = 40.8 ~ 29
    expect(palette.action.disabled).toBe('#919EABcc') // 0.8*255 = 204 ~ cc
    expect(palette.action.disabledBackground).toBe('#919EAB3d')
    expect(palette.action.focus).toBe('#919EAB3d')
    expect(palette.action.hoverOpacity).toBe(0.08)
    expect(palette.action.disabledOpacity).toBe(0.48)
  })
})

describe('lightBackground', () => {
  it('should have correct background colors', () => {
    expect(lightBackground.background.paper).toBe('rgb(248, 249, 250)')
    expect(lightBackground.background.default).toBe('#e9ecef')
    expect(lightBackground.background.neutral).toBe('#F4F6F8')
  })
})

describe('darkBackground', () => {
  it('should have correct background colors', () => {
    expect(darkBackground.background.paper).toBe('#161C24')
    expect(darkBackground.background.default).toBe('#212B36')
    expect(darkBackground.background.neutral).toBe('#454F5B')
  })
})

describe('lightText', () => {
  it('should have correct text colors', () => {
    expect(lightText.text.primary).toBe('#212B36')
    expect(lightText.text.secondary).toBe('#637381')
    expect(lightText.text.disabled).toBe('#919EAB')
  })
})

describe('darkText', () => {
  it('should have correct text colors', () => {
    expect(darkText.text.primary).toBe('#e9ecef')
    expect(darkText.text.secondary).toBe('#DFE3E8')
    expect(darkText.text.disabled).toBe('#C4CDD5')
  })
})
