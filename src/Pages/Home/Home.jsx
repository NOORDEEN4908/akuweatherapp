import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import CurrentWeather from '../../Components/CurrentWeather/CurrentWeather'
import WeatherGraphs from '../../Components/WeatherGraphs/WeatherGraphs'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <CurrentWeather />
        <WeatherGraphs />
      </div>
  )
}

export default Home
