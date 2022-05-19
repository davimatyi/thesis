import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: __dirname + '/preload.js'
    },
    minHeight: 600,
    minWidth: 800,
    title: "Graphite",
    icon: './public/icon.png',
  });
  // win.removeMenu();

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on('closed', () => win = null);

  // Hot Reloading

  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }

  // const fs = window.require('fs');
}

app.on('ready', () => {
  createWindow();
  
  ipcMain.on('show-open-dialog', (event) => {
    if(!win) return;
    dialog.showOpenDialog(win, {properties: ['openFile'], filters: [{name: 'Graphite JSON', extensions: ['json']}]}).then(selectionResult => {
      event.reply('file-open-reply', selectionResult);
    });
  });  
});

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

