const { app, BrowserWindow } = require('electron');
const path = require('path');
const { registerNordvpnHandlers } = require('./ipc/nordvpnIpc');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/nordvpnPreload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.webContents.openDevTools();
  
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(() => {
  registerNordvpnHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
