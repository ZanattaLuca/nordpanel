const { exec } = require('child_process');

function execNordvpn(command) {
  return new Promise((resolve) => {
    exec(`nordvpn ${command}`, (error, stdout, stderr) => {
      if (error) {
        resolve(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        resolve(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

async function getCountries() {
  return execNordvpn('countries');
}

async function getAccount() {
  return execNordvpn('account');
}

async function nordVpnStatus() {
  return execNordvpn('status');
}

async function nordvpnConnect(country) {
  const connectionTarget = country ? country : '';
  return execNordvpn(`connect ${connectionTarget}`);
}

async function nordvpnDisconnect() {
  return execNordvpn('disconnect');
}

module.exports = {
  getCountries,
  getAccount,
  nordVpnStatus,
  nordvpnConnect,
  nordvpnDisconnect
};