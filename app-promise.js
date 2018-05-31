const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyD5k2NeRSMYAiWsLvJ4RK1P70W_hL_MP_M`;

axios.get(geoCodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address.');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/31b033845c877c05a69ded8244fd07c2/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`Its currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
  if(e.code === 'ECONNREFUSED') {
    console.log('Unable to connect to API Servers');
  } else {
    console.log(e.message);
  }
});
