const { ipcMain } = require('electron');
const { getCountries, getAccount } = require('../services/nordvpnService');

function registerNordvpnHandlers() {
  ipcMain.handle('nordvpn:countries', async () => {
    return await getCountries();
  });

  ipcMain.handle('nordvpn:account', async () => {
    return await getAccount();
  });
}

module.exports = {
  registerNordvpnHandlers,
};
