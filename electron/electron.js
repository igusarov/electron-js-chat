'use strict';
const electron = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 800,
  });

  win.loadURL('http://localhost:3000');

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
