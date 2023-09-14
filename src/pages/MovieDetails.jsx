import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoBlack from '../components/Images/LogoBlack.png';
import home from '../components/Images/Home.png';
import tvImg from '../components/Images/TV Show.png';
import logout from '../components/Images/Logout.png';
import calender from '../components/Images/Calendar.png';
import movieIcon from '../components/Images/Movie Projector.png';
import rightImage from '../components/Images/Calendar.png';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { id } = useParams(); 

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cda4ffa2942badacf7d635acb2bbe728&append_to_response=videos,images`)
      .then((res) => res.json())
      .then((json) => setMovieDetails(json))
      .catch((err) => console.error(err));
  }, [id]);

    console.log(movieDetails);
  return (
    <div className='flex'>
       <div className="w-[16%] flex-col h-full space-y-2 py-3 rounded-br-3xl rounded-tr-3xl border-r-[1px] border-r-stone-350 hidden md:flex">
        <div className="p-3">
           <img src={logoBlack} alt="" />
        </div>

        <div className="flex flex-col justify-center space-y-3 py-8">
          <div className='flex space-x-3 p-3 pl-5  hover:bg-red-400 hover:border-r-[3px] hover:border-r-slate-950 cursor-pointer'>
            <img src={home} alt="" />
            <p className="font-semibold text-[17px] text-gray-700">Home</p>
          </div>
          <div className='flex space-x-3 p-3 pl-5 hover:border-r-[3px] hover:border-r-slate-950 hover:bg-red-400 cursor-pointer'>
            <img src={movieIcon} alt="" />
            <p className="font-semibold text-[17px] text-gray-700">Movies</p>
          </div>
          <div className='flex space-x-3 p-3 pl-5  hover:bg-red-400 hover:border-r-[3px] hover:border-r-slate-950 cursor-pointer'>
            <img src={tvImg} alt="" />
            <p className="font-semibold text-[17px] text-gray-700">TV Series</p>
          </div>
          <div className='flex space-x-3 p-3 pl-5  hover:bg-red-400 hover:border-r-[3px] hover:border-r-slate-950 cursor-pointer'>
            <img src={calender} alt="" />
            <p className="font-semibold text-[17px] text-gray-700">Upcoming</p>
          </div>
        </div>
          
          <div className='pt-10 p-3 mt-8 mx-4 m-1 bg-red-100 rounded-2xl border-2 border-red-400'>
            <p className='font-semibold pr-2 text-gray-700'>Play movie quizes and earn free tickets</p>
            <p className='py-3 text-gray-600 text-[14px]'>50k people are playing now</p>
            <button className='text-red-700 text-[15px] font-semibold px-6 py-2 rounded-full bg-red-200'>Start playing</button>
          </div>

          <div className='flex pt-3 justify-center space-x-1'>
            <img src={logout} alt="" />
            <p className="font-semibold text-[17px] text-gray-700">Log out</p>
          </div>
       </div>

      <div className="p-3 w-[80%] h-1/2 flex flex-col space-y-3">
         <div className="rounded-md">
         <img className="w-full h-1/2 rounded-xl" data-testid="movie-poster" src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt='logo' />
         </div>
      <h2><span data-testid="movie-title">{movieDetails.title}m</span> • <span data-testid="movie-release-date">{movieDetails.release_date}</span> • PG-13 • <span data-testid="movie-runtime">{movieDetails.runtime}m</span>   <span className='text-red-700 text-[15px] font-semibold px-6 py-2 rounded-full bg-red-200'>{movieDetails?.genres?.map((item) => <span>{item.name}</span>)}</span></h2>
      <p data-testid="movie-overview">{movieDetails.overview}</p>
      <div className="flex justify-between">
      <div className="flex flex-col space-y-6">
        <p>Director : <span className='text-red-700'>Joseph Kosinki</span></p>
        <p>Writers : <span className='text-red-700'>Jim Cash, Jack Epps Jr, Peter Craig</span></p>
        <p>Stars : <span className='text-red-700'>Tom Cruise, Jennifer Connely, Miles Teller</span></p>
        <button className='text-center px-4 py-3 rounded-md w-[100%] bg-red-800 text-white'>Top rated movie #{movieDetails.id}</button>
      </div>
      <div className="">
        <img src={rightImage} alt="" />
      </div>
      </div>
      </div>
     
    </div>
  );
};

export default MovieDetails;
