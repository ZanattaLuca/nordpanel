const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nordvpn', {
  getCountries: async () => {
    return await ipcRenderer.invoke('nordvpn:countries');
  },

  account: async () => {
    return await ipcRenderer.invoke('nordvpn:account');
  },
});
