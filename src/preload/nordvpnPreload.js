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
  startFetchAllCities: () => {
    ipcRenderer.send('nordvpn:fetch-all-cities');
  },
  onAllCitiesProgress: (callback) => {
    ipcRenderer.removeAllListeners('nordvpn:all-cities-progress'); 
    ipcRenderer.on('nordvpn:all-cities-progress', (event, progress) => {
      callback(progress);
    });
  }
});
