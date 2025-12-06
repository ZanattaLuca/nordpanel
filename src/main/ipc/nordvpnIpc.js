const { ipcMain } = require('electron');
const { getCountries, getAccount, nordVpnStatus } = require('../services/nordvpnService');

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
}

module.exports = {
  registerNordvpnHandlers,
};
