'use strict'

const axios=require('axios');


module.exports = getMovies;

function getMovies(city) {
  const key = 'movie-' + city;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MovieAPIKEY}&query=${movies}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseMovie(response.data));
  }
  
  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie{
  constructor(movieObj){
    this.title=movieObj.title;
    this.posterPath=movieObj.poster_path;
    this.description=movieObj.overview;
  }
}

// async function getMovies(request,response){
//   let movieURL=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MovieAPIKEY}&query=${request.query.searchQuery}`;
//   try{
//   let returnedMovieData=await axios.get(movieURL);
//   returnedMovieData=returnedMovieData.data.results;
//   let moviesArray=returnedMovieData.map(movie=> new Movie(movie));
//   response.sendStatus(200).send(moviesArray);
//   }catch(error){
//     console.log(error.message);
//   }
// };

// module.exports=getMovies;