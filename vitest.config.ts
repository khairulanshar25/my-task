import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      exclude: [
        'src/MockServer/**',
        'public/**',
        'src/theme/overrides/**',
        '**/*.config.*',
        '**/*.d.ts',
        'setupTests.ts',
      ],
    },
  }
})