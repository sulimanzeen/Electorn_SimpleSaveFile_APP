const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');



function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'profile.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);


Menu.setApplicationMenu(null); // Hide the default menu

// Handle saving file from renderer
ipcMain.handle('save-file', async (event, filename, content) => {
  
    // Example: save to desktop
    const desktopPath = app.getPath('desktop');
    const fullPath = path.join(desktopPath, filename);

   fs.writeFile(fullPath, content, 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully!');
    });
  
});