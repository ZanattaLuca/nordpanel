const { ipcMain } = require('electron');
const { getCountries, getAccount, nordVpnStatus, nordvpnConnect,nordvpnDisconnect } = require('../services/nordvpnService');

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
}

module.exports = {
  registerNordvpnHandlers,
};
