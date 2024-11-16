import eslint from '@eslint/js';
import compat from 'eslint-plugin-compat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs'],
        },
      },
    },
  },
  {
    ...compat.configs['flat/recommended'],
    files: ['src/client/**/*.ts'],
    settings: {
      lintAllEsApis: true,
      polyfills: ['Promise'],
    },
  },
  {
    ignores: ['dist', 'test'],
  }
);
