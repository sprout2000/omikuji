const { app, BrowserWindow } = require('electron');
const isDev = process.env.NODE_ENV === 'development';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    backgroundColor: '#efeff4',
    webPreferences: {
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:7777');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadURL('https://sprout2000.github.io/omikuji/');
  }

  mainWindow.once('ready-to-show', () => mainWindow.show());
};

app.whenReady().then(createWindow);
app.once('window-all-closed', () => app.quit());
