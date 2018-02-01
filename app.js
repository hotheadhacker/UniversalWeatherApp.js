const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        var cel1 = ((weatherResults.temperature - 32) * 5 ) / 9;
        var cel2 = ((weatherResults.apparentTemperature - 32) * 5 ) / 9;
        console.log(`It's currently ${cel1} Celcius. It feels like ${cel2} Celcius.`);
      }
    });
  }
});
