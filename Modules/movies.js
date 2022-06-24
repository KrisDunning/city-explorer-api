'use strict'

const axios=require('axios');

class Movie{
  constructor(movieObj){
    this.title=movieObj.title;
    this.posterPath=movieObj.poster_path;
    this.description=movieObj.overview;

  }
}

async function getMovies(request,response){
  let movieURL=`https://api.themoviedb.org/3/search/movie?api_key={process.env.MovieAPIKEY}&query={request.query.searchQuery}`;
  try{
  let returnedMovieData=app.get(await axios.get(movieURL));
  returnedMovieData=returnedMovieData.results;
  let moviesArray=returnedMovieData.map(movie=> new Movie(movie));
  response.send(200).send(moviesArray);
  }catch(error){
    console.log(error.message);
  }
};

module.exports=getMovies;