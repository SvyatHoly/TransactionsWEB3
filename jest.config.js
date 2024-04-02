module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation|@react-native|@shopify/flash-list|react-native-*)/)',
  ],
  testMatch: [
    '<rootDir>/__tests__/*.test.tsx?(x)',
    '<rootDir>/src/**/*.test.tsx',
  ],
};
