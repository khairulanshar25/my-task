export default {
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less|png|jpg|jpef|gif|svg|woff2|woff)$': 'identity-obj-proxy',
    'axios': 'axios/dist/node/axios.cjs'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.tsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
}
