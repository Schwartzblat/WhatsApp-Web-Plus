const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.jest,
            },
            parserOptions: {
                'ecmaVersion': 'latest'
            },
        },
        ignores: [
            'build'
        ],
        rules: {
            indent: [
                'error',
                4
            ],
            'linebreak-style': [
                'error',
                'windows'
            ],
            quotes: [
                'error',
                'single'
            ],
            semi: [
                'error',
                'always'
            ],
            'no-undef': 'off',
            'no-unused-vars': 'off'
        }
    },
    {
        files: ['packed.js'],
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error'
        }
    }
];
