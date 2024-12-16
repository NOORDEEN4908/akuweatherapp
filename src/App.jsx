import React from 'react'
import './index.css'
import Home from './Pages/Home/Home'
import WeatherBox from "./CurrentWeather";

const App = () => {
  return (
    <div>
      <Home />
      <CurrentWeather />
    </div>
  )
}

export default App
