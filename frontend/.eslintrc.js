module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    node: true,
    es2020: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'react/require-default-props': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    // '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    // '@typescript-eslint/no-empty-interface': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // 'react/no-unescaped-entities': 'off',
  },
};
