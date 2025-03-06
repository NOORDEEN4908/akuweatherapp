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
import WeatherForecast from "../Weatherforcast/WeatherForcast";
import WeatherGraphs from "../WeatherGraphs/WeatherGraphs"; // Correct import

const CurrentWeather = () => {
  const apiKey = "2febae47135f879377604dfd6ab516a2";
  const [city, setCity] = useState("Akurana"); // Default city
  const [wicon, setWicon] = useState("");
  const [background, setBackground] = useState(""); // Default background class
  const [weatherData, setWeatherData] = useState({
    temp: "--",
    location: "--",
    humidity: "--",
    wind: "--",
    windDirection: 0,
    rainfall: [],
    humidityData: [],
    temperatureData: [],
    windSpeedData: []
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
        // Assuming that we get hourly data for charts (e.g., fetched from a different API or data structure)
        rainfall: [2, 4, 1, 0, 3, 0, 0, 2], // Example hourly rainfall data
        humidityData: [50, 55, 60, 65, 70, 75, 80, 85], // Example hourly humidity data
        temperatureData: [25, 24, 23, 22, 23, 24, 26, 27], // Example hourly temperature data
        windSpeedData: [5, 6, 4, 3, 5, 7, 8, 6], // Example hourly wind speed data
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
        rainfall: [],
        humidityData: [],
        temperatureData: [],
        windSpeedData: []
      });
      setWicon(clear_icon);
      setBackground("clear_bg");
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
    <>
      <div className={`weather-app-container current-weather ${background}`}>
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

        {/* Pass city and data to WeatherGraphs */}
        <WeatherForecast city={city} />
       
      </div>
      <WeatherGraphs
          city={city}
       
        />
    </>
  );
};

export default CurrentWeather;
