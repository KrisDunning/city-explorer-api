'use strict'

const axios = require('axios');
let cache = require('./cache.js');

module.exports = getWeather;

function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WeatherAPIKEY}&lat=${lat}&lon=${lon}&days=3`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseWeather(response.data));
  }
  
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}




// class Forecast {
  //   constructor(wxObj) {
    //     this.datetime = wxObj.datetime;
    //     this.description = wxObj.description;
    //   };
    // }
    
    // async function getWeather(request, response) {
      //   console.log('Lat & Lon: ', request.query.lat, request.query.lon);
      //   let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WeatherAPIKEY}&lat=${request.query.lat}&lon=${request.query.lon}&units=I&days=3`;
      //   console.log(weatherURL);
//   try {
  //     let returnedWeather = await axios.get(weatherURL);
  //     returnedWeather = returnedWeather.data.data;
  //     let wxArray = returnedWeatherData.map(day => new Forecast(day));
  //     console.log('WXArray: ', wxArray);
  //     response.status(200).send(returnedWeather);
  //   } catch (error) {
    //     response.status(500).send(error);
    //   }
    // };
    // module.exports = getWeather;
    
    