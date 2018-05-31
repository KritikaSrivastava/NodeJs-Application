const request = require('request');

var getWeather = (lat,lng,callback) => {
  request({
    url: `https://api.darksky.net/forecast/31b033845c877c05a69ded8244fd07c2/${lat},${lng}`,
    json:true
  },(error,response,body) => {
    if(error) {
      callback('Unable to connect to forcast.io servers');
    } else if(response.statusCode == 400) {
      callback('Unable to fetch weather');
    }
    else if(response.statusCode == 200) {
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
    }
    else {
       callback('Unable to fetch weather');
    }
  });
};

module.exports = {
  getWeather
};
