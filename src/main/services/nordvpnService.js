const { exec } = require('child_process');
const { parseCountriesAndCities } = require('./utils')

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
  return await execNordvpn('countries');
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

async function getAllCities(progressReporter) {
    
    const rawCountries = await getCountries();
    const countryNames = parseCountriesAndCities(rawCountries);
    
    const totalCountries = countryNames.length;
    let completedCount = 0;
    
    progressReporter({
        total: totalCountries,
        current: completedCount,
        status: 'Starting fetch...'
    });
    
    const allCities = {};
    const cityPromises = countryNames.map(async (country) => {
      const commandCountry = country.replace(/ /g, '_'); 

        try {
            const rawCities = await execNordvpn(`cities ${commandCountry}`);
            const citiesList = parseCountriesAndCities(rawCities);

            allCities[country] = citiesList;
            
        } catch (error) {
            console.warn(`[WARNING] Could not fetch cities for ${country}. Skipping.`);
        } finally {

            completedCount++;
            progressReporter({
                total: totalCountries,
                current: completedCount,
                status: `Fetching cities for ${country}...`
            });
        }
    });

    await Promise.all(cityPromises);

    progressReporter({ 
        total: totalCountries,
        current: totalCountries,
        status: 'Completed',
        data: JSON.stringify(allCities, null, 2)
    });
}

module.exports = {
  getCountries,
  getAccount,
  nordVpnStatus,
  nordvpnConnect,
  nordvpnDisconnect,
  getAllCities
};