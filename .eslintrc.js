module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-native/no-inline-styles': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  plugins: ['prettier'],
};
