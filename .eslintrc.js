module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'react-app',
        'airbnb',
        'plugin:import/typescript',
    ],
    plugins: ['react', '@typescript-eslint'],
    env: {
        browser: true,
        jasmine: true,
        jest: true
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/prefer-default-export': 'off',
        'import/named': 'off',
        'react/prop-types': 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'max-len': ['error', { code: 120 }],
        'newline-before-return': 'error',
        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],
        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'import/extensions': 'off',
        'react/jsx-props-no-spreading': 'off',
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        },
    },
    parser: '@typescript-eslint/parser'
};
