window.addEventListener('DOMContentLoaded', () => {

  const btnCountry = document.getElementById('btn-country');
  const outCountry = document.getElementById('output');

  let lastCountries = null;

  btnCountry.addEventListener('click', async () => {
    outCountry.textContent = 'Running "nordvpn countries"...';

    try {
      const result = await window.nordvpn.getCountries();
      lastCountries = result;
      outCountry.textContent = result;
      console.log('Countries:', lastCountries);
    } catch (err) {
      outCountry.textContent = 'Error: ' + err;
    }
  });

  const btnAccount = document.getElementById('btn-account');
  const outAccount = document.getElementById('outputLog');

  let account = null;

  btnAccount.addEventListener('click', async () => {
    outAccount.textContent = 'Running "nordvpn account"...';

    try {
      const result = await window.nordvpn.account();
      account = result;
      outAccount.textContent = result;
      console.log('Account:', account);
    } catch (err) {
      outAccount.textContent = 'Error: ' + err;
    }
  });
});
