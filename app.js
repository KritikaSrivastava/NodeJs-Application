const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
.options({
  a:{
    demand: true,
    alias: 'address',
    description: 'Address to fetch weather for',
    string:true
  }
})
.help()
.alias('help','h')
.argv;

var address = yargs.argv.a;
geocode.geocodeAddress(address,(errorMessage,results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResult) => {
      if(errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`The temperature is ${weatherResult.temperature} but it feels like ${weatherResult.apparentTemperature}.`);
      }
    });
  }
});
