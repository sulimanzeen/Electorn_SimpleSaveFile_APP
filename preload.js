const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ZeenAPI', {
  saveFile: (filename, content) => ipcRenderer.invoke('save-file', filename, content)
});
