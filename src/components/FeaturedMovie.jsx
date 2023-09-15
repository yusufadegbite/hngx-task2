import { useEffect, useState } from "react";
import rightIcon from './Images/Chevron right.png'
import apple from './Images/apple.png'
import imdbLogo from './Images/imdb.png'
import favorite from './Images/Heart.png'
import favoriteRed from './Images/HeartSvg.svg'
import { Link } from 'react-router-dom'

const FeaturedMovie = () => {
    const [movieList, setMovieList] = useState([]);
    const [favoriteStatus, setFavoriteStatus] = useState({});

  const toggleFavorite = (movieId) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [movieId]: !prevStatus[movieId],
    }));
  };

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=cda4ffa2942badacf7d635acb2bbe728"
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

  const displayedMovies = movieList.slice(0, 10);

  console.log(displayedMovies);


  return (
    <div className='container px-[4rem] md:px-[10rem] p-5 flex flex-col justify-center space-y-3'>
       <div className="flex w-full justify-between pt-1">
        <div><h2 className='text-[22px] font-medium'>Featured Movie</h2></div>
        <div className="flex">
            <p className='text-red-700 font-semibold'>See more</p>
            <img className='w-[2rem] h-[1.5rem] mt-[0.09rem]' src={rightIcon} alt="" />
        </div>
       </div>

       <div data-testid="movie-card" className="relative grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 md:gap-4 gap-2">
      {displayedMovies.map((movie)=>{
        return (
       <div className="" key={movie.id}>
          <div className="">
          <div onClick={() => toggleFavorite(movie.id)} className="flex justify-end cursor-pointer">
             {favoriteStatus[movie.id] ? <img className='absolute m-2' src={favoriteRed} alt="" /> : <img className='absolute m-2' src={favorite} alt="" />}
          </div>
          <Link to={`/movie/${movie.id}`}>
          <img data-testid="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='logo' />
         
         <h2 className="text-[16px] text-gray-400">USA 2021</h2>
         <p data-testid="movie-title">{movie.title}</p>
         <div className="flex space-x-3 my-3">
          <span className="flex space-x-2">
            <img src={imdbLogo} alt="" />
            <p className="">{movie.vote_count}/100</p>
          </span>
          <span className="flex space-x-2">
            <img src={apple} alt="" />
            <p className="">97%</p>
          </span>
        </div>
        <p data-testid="movie-poster" className="">{movie.release_date}</p>
        </Link>
         </div>
       </div>
        );
      })}
  </div>
      
    </div>
  )
}

export default FeaturedMovie;