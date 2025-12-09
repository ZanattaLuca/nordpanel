function parseCountriesAndCities(rawOutput) {
    if (!rawOutput) return [];

    return rawOutput
        .split(/\s+/) 
        .map(name => name.trim())
        .filter(name => name.length > 0 && !name.startsWith('*')); 
}

module.exports = {
  parseCountriesAndCities,
};