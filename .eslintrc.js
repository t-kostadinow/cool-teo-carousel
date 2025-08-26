module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', '@typescript-eslint/recommended', 'prettier', 'plugin:storybook/recommended'],
    ignorePatterns: ['dist', '.eslintrc.js'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
}
