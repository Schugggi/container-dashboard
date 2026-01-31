import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getContainers: () => ipcRenderer.invoke('get-containers'),
});
