'use strict'

console.log('Our first server');

// REQUIRE
const cors= require('cors');
const express= require('express');
const axios= require('axios');
const getWeather=require('./Modules/weather.js');
const getMovies = require('./Modules/movies.js');
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

app.get('/weather',getWeather);
app.get('/movies',getMovies);
app.get('*', (request,response)=>{
  response.send("The page you are looking for doesn't exist");
});

//ERRORS
//handle any errors
app.use((error,request,response,next)=>{
  console.log(error.message);
  response.status(500).send(error.message);
});
//LISTEN
//start server and server listens
// .listen is express method that takes port value and callback function
app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));