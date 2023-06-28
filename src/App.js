import React,{ useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);


  const fetchMovieHander = useCallback(async () =>{
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://swapi.dev/api/films/');
      if(!response.ok){
        throw new Error("Somethig went wrong");
      }
      const data = await response.json();
      const moviesData = data.results.map(movies => {
        return{
          id: movies.episode_id,
          title: movies.title,
          releaseDate: movies.release_date,
          openingText: movies.opening_crawl
        };
      });
      setMovies(moviesData);
    }catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect( () => {
    fetchMovieHander();
  },[fetchMovieHander]);


  let content = <p>No Movies Found</p>;
  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }

  if(error){
    content = <p>{error}</p>;
  }
  if(isLoading){
    content = <p>Loading....</p>;
  }

  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHander}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
