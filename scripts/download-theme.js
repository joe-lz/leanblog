const download = require('download-git-repo')
const fs = require('fs')
const rimraf = require('rimraf')
const config = require('../omb.config.js')

download('joe-lz/ombTheme-white-admin', 'temp_theme/admin', async (err) => {
  await copyFolder({ oldPath: 'temp_theme/admin/pages', newPath: 'src/pages/admin' })
  await copyFolder({ oldPath: 'temp_theme/admin/components', newPath: 'src/components/admin' })

  // download('joe-lz/ombTheme-white-www', 'temp_theme/www', async (err) {
  //   if (!err) {
  //   }
  // })
})

const copyFolder = ({ oldPath, newPath }) => {
  return new Promise((resolve, reject) => {
    rimraf.sync(newPath)
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
