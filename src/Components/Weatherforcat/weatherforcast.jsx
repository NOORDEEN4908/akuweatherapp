import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";
import "./WeatherApp.css";

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [background, setBackground] = useState("cloud_bg");
  const [error, setError] = useState(null); // State for error messages

  const API_KEY = "2febae47135f879377604dfd6ab516a2";

  // Fetch forecast based on city
  const fetchWeather = async (searchCity) => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}`;

    try {
      const forecastResponse = await fetch(forecastURL);
      const forecastData = await forecastResponse.json();

      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message); // Throw error for invalid response
      }

      // Clear any previous error
      setError(null);

      // Filter forecast for every 6 hours
      const filteredForecast = forecastData.list.filter((_, index) => index % 2 === 0);

      setForecast(
        filteredForecast.map((item) => ({
          date: item.dt_txt,
          temp: (item.main.temp - 273.15).toFixed(1), // Convert from Kelvin to Celsius
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        }))
      );

      // Set background based on the first forecast's weather condition
      const condition = forecastData.list[0].weather[0].main;
      if (condition === "Clear") setBackground("clear_bg");
      else if (condition === "Clouds") setBackground("cloud_bg");
      else if (condition === "Rain") setBackground("rainy_bg");
      else if (condition === "Snow") setBackground("snowy_bg");
      else setBackground("default_bg"); // Fallback for unknown conditions
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setError(error.message); // Set error message
      setForecast([]); // Clear forecast data on error
      setBackground("default_bg"); // Reset background
    }
  };

  // Fetch weather whenever the city prop changes
  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  return (
    <div className={`weather-forecast-container ${background}`}>
      <h3>4-Hour Forecast</h3>

      {/* Display error message */}
      {error && <p className="error-message">{error}</p>}

      <div className="forecast-container">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.date).toLocaleString("en-US", { hour: "numeric", hour12: true })}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
            />
            <p>{item.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
