import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
// import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
// import js from "@eslint/js";
// import { plugin } from 'mongoose';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    // recommendedConfig: js.configs.recommended,
    // allConfig: js.configs.all,
});

export default [
    ...fixupConfigRules(
        compat.extends(
            // 'eslint:recommended',
            'plugin:prettier/recommended'
            // 'plugin:import/errors',
            // 'plugin:import/warnings'
        )
    ),
    // js.configs.recommended,
    {
        // files: ['src/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.mongo,
            },

            // parser: babelParser,
            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                requireConfigFile: false,

                babelOptions: {
                    presets: ['@babel/preset-env'],

                    plugins: [
                        '@babel/plugin-syntax-import-attributes',
                        '@babel/plugin-proposal-optional-chaining',
                    ],
                },
            },
        },

        rules: {
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: false,
                },
            ],

            'no-import-assign': 'error',

            'id-length': [
                'error',
                {
                    properties: 'always',
                    min: 2,
                    max: 100,
                    exceptions: ['i', 'x', 'p', 'm', 'e', 'c'],
                },
            ],

            camelcase: [
                'error',
                {
                    properties: 'always',
                    ignoreDestructuring: true,
                    allow: ['^start_seq'],
                },
            ],

            // 'key-spacing': [
            //     'error',
            //     {
            //         beforeColon: false,
            //         afterColon: true,
            //     },
            // ],

            'no-duplicate-imports': [
                'error',
                {
                    includeExports: true,
                },
            ],

            'no-template-curly-in-string': 'error',

            'no-use-before-define': [
                'error',
                {
                    functions: true,
                    classes: true,
                    variables: true,
                    allowNamedExports: true,
                },
            ],
        },
    },
];
