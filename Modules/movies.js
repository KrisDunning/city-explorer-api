'use strict'

const axios=require('axios');
let cache = require('./cache.js');

module.exports = getMovies;

function getMovies(city) {
  const key = 'movie-' + city;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MovieAPIKEY}&query=${city}`;

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
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
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
