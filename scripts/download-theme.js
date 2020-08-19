const config = require('../omb.config.js')
const download = require('download-git-repo')

download('joe-lz/ombTheme-white-www', 'src/pages/www', function (err) {
  if (!err) {
    download('joe-lz/ombTheme-white-admin', 'src/pages/admin', function (err) {})
  }
})
