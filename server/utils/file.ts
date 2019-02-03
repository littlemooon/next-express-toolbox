import * as fs from 'fs'

export function writeFileAsync(filename: string, text: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, text, err => {
      if (err) {
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
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function readDirAsync(dir: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
