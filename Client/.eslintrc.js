module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier', 'jsx-a11y'],
  rules: {
    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'ignore',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
};
