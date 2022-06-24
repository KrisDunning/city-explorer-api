'use strict'

const axios=require('axios');


class Forecast{
  constructor(wxObj){
    this.datetime=wxObj.datetime;
    this.description=wxObj.description;   
  };
}

async function getWeather(request,response){
  console.log ('Lat & Lon: ',request.query.lat,request.query.lon);
  let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${process.env.WeatherAPIKEY}&units=I&days=3`;
  try{
  let returnedWeather = await axios.get(weatherURL);
  returnedWeather = returnedWeather.data.data;
  let wxArray=returnedWeatherData.map(day=> new Forecast(day));
  console.log('WXArray: ',wxArray);
  response.status(200).send(returnedWeather);
  }catch(error){
    response.status(500).send(error);
  }
};

module.exports=getWeather;
