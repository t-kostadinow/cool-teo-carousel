import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import storybook from 'eslint-plugin-storybook';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        requestAnimationFrame: 'readonly',
        ResizeObserver: 'readonly',
        HTMLDivElement: 'readonly',
        NodeJS: 'readonly',
        React: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      storybook: storybook,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...storybook.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        requestAnimationFrame: 'readonly',
        ResizeObserver: 'readonly',
        HTMLDivElement: 'readonly',
        NodeJS: 'readonly',
        React: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  prettier,
  {
    ignores: ['dist/**', 'node_modules/**', '.husky/**'],
  },
];
