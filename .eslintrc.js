module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'prettier'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': ['error'],
  },
};
