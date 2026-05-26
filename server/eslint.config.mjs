import daStyle from 'eslint-config-dicodingacademy';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  daStyle,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
        },
      ],
      quotes: ['error', 'single'],
      camelcase: 'off',
    },
  },
  prettierConfig,
];
