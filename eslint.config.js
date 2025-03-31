import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';

export default [
  js.configs.recommended,
  reactRecommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off', // Отключить проверку prop-types, если не используется
      'no-unused-vars': 'warn', // Предупреждение для неиспользуемых переменных
      'no-console': 'warn', // Предупреждение для console.log
    },
    settings: {
      react: {
        version: 'detect', // Автоматически определять версию React
      },
    },
  },
];