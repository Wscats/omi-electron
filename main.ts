import { app, BrowserWindow } from 'electron';
import * as path from 'path';

/** Global reference to the main window to prevent garbage collection. */
let mainWindow: BrowserWindow | null = null;

/** Create the main application window. */
function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    resizable: false,
    movable: true,
    maximizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
