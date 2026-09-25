import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    // Warnings instead of errors for issues in the 2022 code; cleaning them up is step 2 (see TODO.md)
    rules: {
      'no-unused-vars': 'warn',
      'no-case-declarations': 'warn',
      'no-useless-assignment': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]);
