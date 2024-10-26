module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'eslint:recommended', // Use the recommended rules from ESLint
        'plugin:react/recommended', // Use the recommended rules from eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Use the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:jsx-a11y/recommended', // Accessibility rules
        'plugin:react-hooks/recommended', // React hooks rules
        'prettier', // Prettier integration
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020, // Allows for parsing modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Automatically detect the react version
        },
    },
    rules: {
        // TypeScript rules
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],

        // React-specific rules
        'react/prop-types': 'off', // Turn off prop-types rule as we use TypeScript for type checking

        // Accessibility
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['noHref', 'invalidHref', 'preferButton'],
            },
        ],

        // Other rules
        'no-console': 'warn',
        'react/react-in-jsx-scope': 'off', // Not required with React 17+
        'semi': ['error', 'always'],
    },
};
