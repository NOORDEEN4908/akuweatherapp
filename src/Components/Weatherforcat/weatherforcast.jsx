import React, { useState, useEffect } from "react";
import "./WeatherForecast.css";

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(""); // State for location
  const [background, setBackground] = useState("cloud_bg");
  const [error, setError] = useState(null);

  const API_KEY = "2febae47135f879377604dfd6ab516a2";

  const fetchWeather = async (searchCity) => {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}`;

    try {
      const forecastResponse = await fetch(forecastURL);
      const forecastData = await forecastResponse.json();

      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message);
      }

      setError(null);

      // Set location
      setLocation(forecastData.city.name);

      // Filter for daily data (e.g., first item of each day, typically at "12:00:00")
      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(
        dailyForecast.map((item) => ({
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
      else setBackground("default_bg");
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setError(error.message);
      setForecast([]);
      setBackground("default_bg");
    }
  };

  useEffect(() => {
    if (city) fetchWeather(city);
  }, [city]);

  return (
    <div className={`weather-forecast-container ${background}`}>
      <h3>5-Day Forecast of {location}</h3>
       {/* Display the location */}

      {error && <p className="error-message">{error}</p>}

      <div className="forecast-row">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.date).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
              alt={item.description}
            />
            <p>{item.temp}°C</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
