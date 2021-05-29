module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'eslint-plugin-import',
		'eslint-plugin-react-hooks',
		'eslint-plugin-jsx-a11y',
		'eslint-plugin-react',
	],
	rules: {
		'no-console': 2,
		'no-var': 1,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'linebreak-style': 0,
		'react/prop-types': 0,
		'react/jsx-props-no-spreading': 0,
		'react/jsx-one-expression-per-line': 0,
		'react/jsx-filename-extension': [
			'off',
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				useTabs: true,
			},
		],
	},
};
