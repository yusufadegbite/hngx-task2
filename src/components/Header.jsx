import FeaturedMovie from '../components/FeaturedMovie'
import { useEffect, useState } from "react";
import logo from './Images/Logo.png'
import menu from './Images/hamburger.png'
import watchLaterBtn from './Images/Button.png'
import apple from './Images/apple.png'
import imdbLogo from './Images/imdb.png'
import search from './Images/Search.png'
import favorite from './Images/Heart.png'
import favoriteRed from './Images/HeartSvg.svg'
import { Link } from 'react-router-dom'


const Header = () => {
  const [term, setTerm] = useState("");
  const [endPoint, setEndPoint] = useState(""); // Initialize with an empty string
  const [movieList, setMovieList] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [error, setError] = useState(null); // Track API errors

  const toggleFavorite = (movieId) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [movieId]: !prevStatus[movieId],
    }));
  };

  const onChangeHandler = (e) => {
    setTerm(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setEndPoint(term);
  };

  const getMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${endPoint}&api_key=cda4ffa2942badacf7d635acb2bbe728`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("No movies found for this search term.");
        }
        return res.json();
      })
      .then((json) => {
        if (json.results.length === 0) {
          setError("No movies found for this search term.");
        } else {
          setError(null);
          setMovieList(json.results);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while fetching data.");
      });
  };

  useEffect(() => {
    if (endPoint) {
      getMovie();
    }
  }, [endPoint]);
  return (
    <div>
    <div className='head'>
      <div className="flex justify-evenly p-6 container">
      <div className="">
          <img  src={logo} alt="" />
      </div>
      <div className="mt-1 hidden md:block">
      <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
              <div className="flex relative items-center py-1">
                <input
                  type="text"
                  className="mx-3 border-white border rounded-md appearance-none bg-transparent w-[525px] text-white  mr-2 py-1 px-1 leading-tight font-normal text-[16px] focus:outline-none"
                  placeholder="What do you want to watch?"
                  value={term}
                  onChange={onChangeHandler}
                />
                <button className='absolute right-4' type="submit"><img src={search} alt="" /></button>
              </div>
            </form>
      </div>
      <div className="flex mt-1">
        <div className=""><p className='text-white px-4 pt-2'>Sign In</p></div>
       <div className=""> <img className='rounded-full p-2 menuIcon' src={menu} alt="" /></div>
      </div>
    </div>

    <div className="mt-1 md:hidden flex justify-center">
    <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
              <div className="flex relative items-center py-1">
                <input
                  type="text"
                  className="mx-3 border-white border rounded-md appearance-none bg-transparent w-[525px] text-white  mr-2 py-1 px-1 leading-tight font-normal text-[16px] focus:outline-none"
                  placeholder="What do you want to watch?"
                  value={term}
                  onChange={onChangeHandler}
                />
                <button className='absolute right-4' type="submit"><img src={search} alt="" /></button>
              </div>
            </form>
      </div>
    
     <div className="flex flex-col text-white w-full md:w-1/2 mt-4 pb-[8rem] py-6 space-y-6 justify-center md:justify-start pl-[2rem] sm:pl-[4rem] md:pl-[10rem] md:px-[8rem]">
        <h4 className='text-[48px] font-bold leading-[3rem]'>John Wick 3 : <br />Parabellum</h4>
        <div className="flex space-x-3">
          <span className="flex space-x-2">
            <img src={imdbLogo} alt="" />
            <p className="">860/100</p>
          </span>
          <span className="flex space-x-2">
            <img src={apple} alt="" />
            <p className="">97%</p>
          </span>
        </div>
        <p className='pr-8'>John Wick is on the run after killing a member of the international assassins' guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.</p>
        <div className="">
      <img src={watchLaterBtn} alt="" />
     </div>
     </div>

     
    </div>
      
      <div className="relative grid grid-cols-1  md:grid-cols-4 sm:grid-cols-2 md:gap-4 gap-y-2 gap-3 p-8">
     {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (movieList.map((movie) => (
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
     )))}
     </div>
     <FeaturedMovie />
    </div>
  );
    
}

export default Header
