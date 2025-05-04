module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: [
    'dist', 'public', 'node_modules',
    'package-lock.json', 'package.json',
    'README.md', '.gitignore',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // opcional
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
      rules: {}
    },
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-refresh'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'eqeqeq': 'off',
    'react/no-is-mounted': 'warn',
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
