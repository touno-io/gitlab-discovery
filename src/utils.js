import { remote, shell } from 'electron'
import fs from 'fs'
class Utils {
  constructor () {
    this._funcScape = ''
  }

  addScapeKey (o, func) {
    this._func = (e) => {
      if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && (e.target.nodeName === 'BODY')) {
        func()
        if (o === 'remove_complete') this.removeScapeKey()
      }
    }
    window.addEventListener('keydown', this._func, false)
  }

  removeScapeKey (func) {
    window.removeEventListener('keydown', this._func, false)
  }

  closeWin () {
    let window = remote.getCurrentWindow()
    window.close()
  }

  maxWin () {
    let window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }

  minWin () {
    let window = remote.getCurrentWindow()
    window.minimize()
  }

  openDevTools () {
    let window = remote.getCurrentWindow()
    window.openDevTools()
  }

  showExternal (path) {
    shell.openExternal(path)
  }

  loadProjectsListFile () {
    return new Promise(function (resolve, reject) {
      fs.readFile('src/projects', 'utf-8', (err, data) => {
        if (err) reject(err)
        resolve(JSON.parse(data))
      })
    })
  }
  updateProjectSelected (newContent) {
    newContent = JSON.stringify(newContent)
    return new Promise(function (resolve, reject) {
      fs.writeFile('src/projects', newContent, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}
export default function u () {
  if (!(this instanceof Utils)) return new Utils()
}
