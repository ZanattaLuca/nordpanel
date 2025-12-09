const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nordvpn', {
  getCountries: async () => {
    return await ipcRenderer.invoke('nordvpn:countries');
  },

  account: async () => {
    return await ipcRenderer.invoke('nordvpn:account');
  },

  nordVpnStatus: async () => {
    return await ipcRenderer.invoke('nordvpn:status');
  },
  nordvpnConnect: async (country) => {
    return await ipcRenderer.invoke('nordvpn:connect', country);
  },
  nordvpnDisconnect: async () => {
    return await ipcRenderer.invoke('nordvpn:disconnect');
  },
  getAllCities: async () => {
    return await ipcRenderer.invoke('nordvpn:allcities');
  },
});
