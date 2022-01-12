import { app, BrowserWindow } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import * as path from "path";

const isDev = !app.isPackaged;

function createWindow () {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 1000,
    height: 800,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (isDev) {
    window.loadURL(`http://127.0.0.1:7001`)
    // Open the DevTools.
    window.webContents.openDevTools({ mode: 'detach' });
  } else {
    window.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
  }
};

app.on('ready', function () {
  createWindow();

  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 非 macos 下关闭所有页面后退出 app
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});