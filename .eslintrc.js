module.exports = {
    env: {
        browser: true,
        es2021: true
    },

    'extends': 'eslint:recommended',
    'overrides': [
        {
            'files': ['packed.js'],
            'rules': {
                'no-unused-vars': 'error',
                'no-undef': 'error'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-undef': 'off',
        'no-unused-vars': 'off'
    }
};
