import React, { useEffect, useState } from "react";
import "./CurrentWeather.css";

const CurrentWeather= () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "2febae47135f879377604dfd6ab516a2"; //ND add theapi key
  const city = "Colombo";

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="weather-box">
      {error && <p className="error">{error}</p>}
      {weatherData ? (
        <div>
          <h2 className="weather-title">Current Weather</h2>
          <h1 className="temperature">{Math.round(weatherData.main.temp)}°F</h1>
          <p className="description">{weatherData.weather[0].description}</p>
          <div className="details">
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} mph</p>
            <p>Pressure: {weatherData.main.pressure} in</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
