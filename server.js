'use strict'

console.log('Our first server');

// REQUIRE
const cors= require('cors');
const express= require('express');
const axios= require('axios');
//const weatherData=require('./data/weather.json');
require('dotenv').config();

// USE
const app=express();
app.use(cors());
const PORT=process.env.PORTANDRE || 3002;


// ROUTES
//we use these to access endpoints
// .get is an express method that correlates to axios.get    prameters(url,callbackfunction)
app.get('/', (request,response)=>{
  response.send("Hello from the other side!");
});


class Forecast{
  constructor(wxObj){
    this.datetime=wxObj.datetime;
    this.description=wxObj.description;   
  };
}

app.get('/weather', async (request,response)=>{
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
});


class Movie{
  constructor(movieObj){
    this.title=movieObj.title;
    this.posterPath=movieObj.poster_path;
    this.description=movieObj.overview;

  }
}

app.get('/movies', async (request,response)=>{
  let movieURL=`https://api.themoviedb.org/3/search/movie?api_key={process.env.MovieAPIKEY}&query={request.query.searchQuery}`;
  try{
  let returnedMovieData=app.get(await axios.get(movieURL));
  returnedMovieData=returnedMovieData.results;
  let moviesArray=returnedMovieData.map(movie=> new Movie(movie));
  response.send(200).send(moviesArray);
  }catch(error){
    console.log(error.message);
  }
});

//catchall route response
app.get('*', (request,response)=>{
  response.send("The page you are looking for doesn't exist");
});


//ERRORS
//handle any errors

//LISTEN
//start server and server listens
// .listen is express method that takes port value and callback function
app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));