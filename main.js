const { app, BrowserWindow, ipcMain } = require('electron')
const { link } = require('original-fs')
const { listDockerContainers } = require('./dockerode')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  
  win.webContents.openDevTools();
  win.loadFile('index.html')
}

ipcMain.handle('get-containers', async () => {
  return await listDockerContainers();
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})