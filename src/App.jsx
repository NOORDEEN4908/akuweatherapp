import React from 'react'
import './index.css'
import Home from './Pages/Home/Home'
import CurrentWeather from './Components/CurrentWeather/CurrentWeather.jsx';

const App = () => {
  return (
    <div>
      <Home />
      <CurrentWeather />
    </div>
  )
}

export default App
