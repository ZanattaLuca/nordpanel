const { ipcMain } = require('electron');
const { getCountries, getAccount, nordVpnStatus, nordvpnConnect, nordvpnDisconnect, getAllCities } = require('../services/nordvpnService');

function registerNordvpnHandlers() {
  ipcMain.handle('nordvpn:countries', async () => {
    return await getCountries();
  });

  ipcMain.handle('nordvpn:account', async () => {
    return await getAccount();
  });

  ipcMain.handle('nordvpn:status', async () => {
    return await nordVpnStatus();
  });
  ipcMain.handle('nordvpn:connect', async (event, country) => {
    return await nordvpnConnect(country);
  });
  
  ipcMain.handle('nordvpn:disconnect', async () => {
    return await nordvpnDisconnect();
  });

  ipcMain.handle('nordvpn:allcities', async () => {
    return await getAllCities();
  });
  ipcMain.on('nordvpn:fetch-all-cities', (event) => {
    const progressReporter = (progress) => {
      event.sender.send('nordvpn:all-cities-progress', progress);
    };
    getAllCities(progressReporter); 
  });
}

module.exports = {
  registerNordvpnHandlers,
};
