const fs = require('fs')
const rimraf = require('rimraf')

rimraf.sync('.gitignore')
fs.rename('scripts/replace-gitignore/template.gitignore', '.gitignore', (err) => {
  console.log(err);
})
