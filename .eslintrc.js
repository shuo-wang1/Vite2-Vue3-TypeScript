module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential'],
  rules: {
    'no-console': import.meta.env.VITE_APP_BASE_AP === 'production' ? 'error' : 'off',
    'no-debugger': import.meta.env.VITE_APP_BASE_AP === 'production' ? 'error' : 'off',
    'no-tabs': 'off',
    'linebreak-style': [0, 'error', 'window'],
    'global-require': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
  ],
};
