import globals from 'globals';
import js from '@eslint/js';
import jsonformat from 'eslint-plugin-json-format';

export default [
  js.configs.recommended, // Recommended config applied to all files
  // Override the recommended config
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.mocha, ...globals.es2021 },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
    },
    ignores: ['package-lock.json', 'coverage/', 'node_modules/', '*.md'],
    plugins: {
      'json-format': jsonformat
    },
    rules: {
      indent: [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      quotes: [
        'error',
        'single'
      ],
      semi: [
        'error',
        'always'
      ],
      'no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_'
        }
      ]
    }
  }
];