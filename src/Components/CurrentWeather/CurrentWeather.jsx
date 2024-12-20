import React, { useState, useEffect } from "react";
import "./CurrentWeather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import rain_icon from "../Assets/rain.png";
import drizzle_icon from "../Assets/drizzle.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import compas_icon from "../Assets/compas.png"
import humidity_icon from "../Assets/humidity.png";

const CurrentWeather = () => {
  const apiKey = "2febae47135f879377604dfd6ab516a2";

  const [wicon, setWicon] = useState("");
  const [background, setBackground] = useState("cloud_bg"); // Default background class
  const [weatherData, setWeatherData] = useState({
    temp: "",
    location: "",
    humidity: "",
    wind: "",
    windDirection: 0,
  });

  // Function to fetch weather data
  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        temp: `${Math.round(data.main.temp)}°C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.round(data.wind.speed)} km/h`,
        windDirection: data.wind.deg, // Wind direction in degrees
      });

      // Update icon and background based on weather condition
      const weatherCondition = data.weather[0].main.toLowerCase();
      if (weatherCondition.includes("clear")) {
        setWicon(clear_icon);
        setBackground("clear_bg");
      } else if (weatherCondition.includes("cloud")) {
        setWicon(cloud_icon);
        setBackground("cloud_bg");
      } else if (weatherCondition.includes("rain")) {
        setWicon(rain_icon);
        setBackground("rainy_bg");
      } else if (weatherCondition.includes("snow")) {
        setWicon(snow_icon);
        setBackground("snowy_bg");
      } else {
        setWicon(drizzle_icon);
        setBackground("default_bg");
      }
    } catch (error) {
      alert("Error fetching weather data! Check the city name.");
      console.error(error);
    }
  };

  // Reload and fetch default Akurana data
  useEffect(() => {
    fetchWeather("Akurana");
  }, []);

  // Search for city weather and reload after 1 second
  const search = () => {
    const cityInput = document.querySelector(".cityInput");
    if (cityInput.value.trim() === "") {
      alert("Please enter a city name!");
      return;
    }

    fetchWeather(cityInput.value);

    // Reload the page after 1 second
    setTimeout(() => {
      window.location.reload();
    }, 9000);
  };

  const getWindDirection = (degree) => {
    const directions = [
        "N", "NNE", "NE", "ENE", 
        "E", "ESE", "SE", "SSE", 
        "S", "SSW", "SW", "WSW", 
        "W", "WNW", "NW", "NNW"
    ];
    const index = Math.round((degree % 360) / 22.5) % 16;
    return directions[index];
};

// Example usage



  return (
    <div className={`container ${background}`}>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search city..." />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>

      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temp}</div>
      <div className="weather-location">{weatherData.location}</div>

      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity" />
          <div>
            <div className="data">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="Wind Speed" />
          <div>
            <div className="data">{weatherData.wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
        <div className="element">
          <img src={compas_icon} alt="Wind Direction" />
          <div>
            <div className="data">{getWindDirection(weatherData.windDirection)}</div>
            <div className="text">Wind Direction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
