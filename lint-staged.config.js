module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix',
  ],
  // '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
  //   'yarn lint:prettier --parser json',
  // ],
  // 'package.json': ['yarn lint:prettier'],
  // '*.md': ['yarn lint:markdownlint', 'yarn lint:prettier'],
}
