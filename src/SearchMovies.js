import React, { useState } from 'react';
import MovieCard from './MovieCard';

const SearchMovies = () => {

  // states input query, movies
  const [query, setQuery] = useState('');
  // create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie/?api_key=629f938b44af17f5ab71f218964cabb8&language=en-US
    &query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <div>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">Type Movie Name Here: </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">Search!</button>
      </form>
      <div className="card-list">
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;