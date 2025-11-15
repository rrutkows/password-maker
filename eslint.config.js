import js from '@eslint/js';
import globals from 'globals';
import css from '@eslint/css';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
    globalIgnores(['dist/**']),
    {
        files: ['**/*.{js,mjs,cjs}'],
        ignores: ['src/common/effectiveTLDNames.js'],
        plugins: { js },
        extends: ['js/recommended']
    },
    {
        basePath: 'src/web',
        languageOptions: { globals: globals.browser }
    },
    {
        basePath: 'src/crx',
        languageOptions: {
            globals: { ...globals.browser, ...globals.webextensions }
        }
    },
    {
        basePath: 'test',
        languageOptions: { globals: globals.jasmine }
    },
    {
        files: ['**/*.css'],
        ignores: ['src/web/public/bootstrap.min.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended']
    },
    eslintConfigPrettier
]);
