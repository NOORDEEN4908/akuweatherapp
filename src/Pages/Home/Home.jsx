import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import CurrentWeather from '../../Components/CurrentWeather/CurrentWeather'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <CurrentWeather />
      </div>
  )
}

export default Home
