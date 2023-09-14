import React from 'react'
import facebook from './Images/facebook.png'
import instagram from './Images/instagram.png'
import twitter from './Images/twitter.png'
import youtube from './Images/youtube.png'

const Footer = () => {
  return (
    <div className='container flex flex-col justify-center mt-8'>
      <div className="flex justify-center p-2 space-x-9">
        <img src={facebook} alt="" />
        <img src={instagram} alt="" />
        <img src={twitter} alt="" />
        <img src={youtube} alt="" />
      </div>
      <div className="flex space-x-6 justify-center font-semibold">
        <p>Contribution of Use</p>
        <p>Privacy & Policy</p>
        <p>Press Room</p>
      </div>
      <div className="text-center">
        <p className="">&copy; 2021 MovieBox by Adriana Eka Prayudha</p>
      </div>
    </div>
  )
}

export default Footer
