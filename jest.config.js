const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!jsonpath-plus)' // 👈 allow transforming this ESM dependency
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
      diagnostics: true
    }]
  },
  moduleNameMapper: {
    // This forces node-style resolution to avoid ESM conflicts
    '^jsonpath-plus$': path.join(__dirname, '/node_modules/jsonpath-plus/dist/index-node-cjs.cjs'),
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  }
};