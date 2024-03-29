const { defaults } = require('jest-config');

module.exports = {
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/jest-transformer.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.js',
  },
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{js,jsx}',
  ],
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.cache', 'public'],
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby)/)',
  ],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: [
    '<rootDir>/loadershim.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
