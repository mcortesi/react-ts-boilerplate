const path = require('path');
module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  testMatch: [
    '<rootDir>/src/**/?(*.)(spec|test).(j|t)s?(x)',
    '<rootDir>/src/**/__tests__/**/*.(j|t)s?(x)',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  globals: {
    'ts-jest': {
      tsConfig: path.join(__dirname, 'tsconfig.test.json'),
    },
  },
  preset: 'ts-jest',
};
