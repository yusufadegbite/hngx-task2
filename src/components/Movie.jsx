import { useEffect, useState } from "react";

const Movie = () => {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=cda4ffa2942badacf7d635acb2bbe728"
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    return () => {
      getMovie();
    };
  }, []);

  console.log(movieList);

  return (
    <div>
      {movieList.map((movie)=>{
        return (
         <div>
         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='logo' />
         <p>{movie.title}</p>
         <h2>{movie.overview}</h2>
         </div>
        );
      })}
  </div>
  );
  
};

export default Movie;
