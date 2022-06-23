'use strict'

console.log('Our first server');

// REQUIRE
// we have to use required instead of import.
const express= require('express');
require('dotenv').config();
const weatherData=require('./data/weather.json');
const cors=require('cors');
const axios=require('axios');
// USE
// once required, we must use it. where we assign required file a variable name
const app=express();
app.use(cors());
//define port and validate dotevn file is working
const PORT=process.env.PORTANDRE || 3002;


// ROUTES
//we use these to access endpoints
// .get is an express method that correlates to axios.get    prameters(url,callbackfunction)
app.get('/', (request,response)=>{
    response.send("Hello from the other side!");
});

class Forecast{
  constructor(weatherObj){
    console.log("This :" ,weatherObj.datetime,weatherObj.weather.description);
    this.datetime=weatherObj.datetime;
    this.description=weatherObj.weather.description;
  }
}

app.get('/weather',(request,response)=>{
let dataToSend=weatherData.find(data=> data.city_name.toLowerCase()===request.query.searchQuery.toLowerCase());
let returnData = dataToSend.data.map(day=> new Forecast(day)); 
response.status(200).send(returnData);
//response.send("test of weather route");
});
//catchall route response
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