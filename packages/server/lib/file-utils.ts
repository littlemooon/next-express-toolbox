import log from 'common/log'
import * as fs from 'fs'

export function writeFileAsync(filename: string, text: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, text, err => {
      if (err) {
        log.error('writeFileAsync:', err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export function readFileAsync(filename: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        log.error('readFileAsync:', err)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function readDirAsync(dir: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, (err, data) => {
      if (err) {
        log.error('readDirAsync:', err)
        reject(err)
      }
      const filesNames = data
        .filter(dirent => !dirent.isDirectory())
        .map(dirent => dirent.name)

      resolve(filesNames)
    })
  })
}
