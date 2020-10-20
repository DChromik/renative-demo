module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'airbnb-typescript',
    ],
    rules: {
      'brace-style': 'error',
      'class-methods-use-this': 'off',
      complexity: ['error', { max: 20 }],
      'eol-last': ['error', 'always'],
      'import/no-default-export': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/prefer-default-export': 'off',
      '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'NextgenJSX' }],
      'linebreak-style': 'off',
      'max-classes-per-file': ['error', 1],
      'max-depth': ['error', { max: 4 }],
      'max-len': ['error', 100],
      'no-duplicate-imports': ['error', { includeExports: true }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-magic-numbers': ['error', { ignore: [-1, 0, 1, 2] }],
      'no-mixed-operators': 'off',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-return-await': 'error',
      'no-use-before-define': ['error', { functions: false }],
      'object-curly-newline': ['error', {
          ObjectExpression: { consistent: true, minProperties: 6, multiline: true },
          ObjectPattern: { consistent: true, minProperties: 6, multiline: true },
      }],
      'padded-blocks': ['error', { classes: 'never' }],
      'prefer-destructuring': ['error', { array: false, object: true }],
      'space-before-function-paren': 'off',
      'react/static-property-placement': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-indent': ['error', 4],
      'react/jsx-indent-props': ['error', 4],
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-tabindex': 'off'
    }
}
