import React, { useState, useEffect } from "react";
import "./CurrentWeather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import rain_icon from "../Assets/rain.png";
import drizzle_icon from "../Assets/drizzle.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import compas_icon from "../Assets/compas.png";
import humidity_icon from "../Assets/humidity.png";
import WeatherForecast from "../Weatherforcat/weatherforcast";
import "../Weatherforcat/WeatherApp.css";

const CurrentWeather = () => {
  const apiKey = "2febae47135f879377604dfd6ab516a2";
  const [city, setCity] = useState("Kandy"); // Default city
  const [wicon, setWicon] = useState(cloud_icon);
  const [background, setBackground] = useState("cloud_bg"); // Default background class
  const [weatherData, setWeatherData] = useState({
    temp: "--",
    location: "--",
    humidity: "--",
    wind: "--",
    windDirection: 0,
  });

  // Fetch weather based on city
  const fetchWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message || "Invalid response from API");
      }

      setWeatherData({
        temp: `${Math.round(data.main.temp)}°C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.round(data.wind.speed)} km/h`,
        windDirection: data.wind.deg,
      });

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
      
      setWeatherData({
        temp: "--",
        location: "--",
        humidity: "--",
        wind: "--",
        windDirection: 0,
      });
      setWicon(cloud_icon);
      setBackground("cloud_bg");
    }
  };

  // Fetch weather on load for the default city
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const search = () => {
    if (city.trim() === "") {
      alert("Please enter a city name!");
      return;
    }
    fetchWeather(city);
  };

  const getWindDirection = (degree) => {
    const directions = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
    ];
    const index = Math.round((degree % 360) / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="weather-app-container">
      <div className={`current-weather ${background}`}>
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="Search" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="Weather Icon" />
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

      <WeatherForecast city={city} />
    </div>
  );
};

export default CurrentWeather;
