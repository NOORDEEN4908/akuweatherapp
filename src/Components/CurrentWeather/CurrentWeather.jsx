import React, { useState, useEffect, useRef } from "react";
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
import WeatherGraphs from "../WeatherGraphs/WeatherGraphs";

const CurrentWeather = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [city, setCity] = useState("Akurana");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [wicon, setWicon] = useState("");
  const [background, setBackground] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNight, setIsNight] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temp: "--",
    location: "--",
    humidity: "--",
    wind: "--",
    windDirection: 0,
    rainfall: [],
    humidityData: [],
    temperatureData: [],
    windSpeedData: [],
    timeOfDay: 'day'
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time function
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format date function
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Check time of day
  const checkTimeOfDay = (sunrise, sunset) => {
    const now = new Date().getTime() / 1000;
    const currentHour = new Date().getHours();

    // Night: After sunset or before sunrise
    if (now < sunrise || now > sunset) {
      return 'night';
    }
    // Early Morning: From sunrise until 9 AM
    else if (currentHour >= 5 && currentHour < 9) {
      return 'morning';
    }
    // Late Morning: From 9 AM until noon
    else if (currentHour >= 9 && currentHour < 12) {
      return 'morning';
    }
    // Afternoon: From noon until 4 PM
    else if (currentHour >= 12 && currentHour < 16) {
      return 'day';
    }
    // Evening: From 4 PM until sunset
    else if (currentHour >= 16 && now <= sunset) {
      return 'evening';
    }
    // Default to day mode
    else {
      return 'day';
    }
  };

  // Fetch weather based on city
  const fetchWeather = async (city) => {
    setIsLoading(true);
    setError(null);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message || "Invalid response from API");
      }

      // Check time of day
      const timeOfDay = checkTimeOfDay(data.sys.sunrise, data.sys.sunset);
      setIsNight(timeOfDay === 'night');

      // Fetch 5-day forecast for better data visualization
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      // Process forecast data for graphs
      const processedData = processForecastData(forecastData);

      setWeatherData({
        temp: `${Math.round(data.main.temp)}°C`,
        location: data.name,
        humidity: `${data.main.humidity}%`,
        wind: `${Math.round(data.wind.speed)} km/h`,
        windDirection: data.wind.deg,
        timeOfDay: timeOfDay,
        ...processedData
      });

      updateWeatherIcon(data.weather[0].main.toLowerCase(), timeOfDay);
    } catch (error) {
      setError(error.message);
      setWeatherData({
        temp: "--",
        location: "--",
        humidity: "--",
        wind: "--",
        windDirection: 0,
        timeOfDay: 'day',
        rainfall: [],
        humidityData: [],
        temperatureData: [],
        windSpeedData: []
      });
      setWicon(clear_icon);
      setBackground("clear_bg");
    } finally {
      setIsLoading(false);
    }
  };

  const processForecastData = (forecastData) => {
    const rainfall = [];
    const humidityData = [];
    const temperatureData = [];
    const windSpeedData = [];

    forecastData.list.forEach(item => {
      rainfall.push(item.rain ? item.rain['3h'] || 0 : 0);
      humidityData.push(item.main.humidity);
      temperatureData.push(Math.round(item.main.temp));
      windSpeedData.push(Math.round(item.wind.speed));
    });

    return {
      rainfall,
      humidityData,
      temperatureData,
      windSpeedData
    };
  };

  const updateWeatherIcon = (weatherCondition, timeOfDay) => {
    let bgClass = "";
    
    if (weatherCondition.includes("clear")) {
      setWicon(clear_icon);
      bgClass = "clear_bg";
    } else if (weatherCondition.includes("cloud")) {
      setWicon(cloud_icon);
      bgClass = "cloud_bg";
    } else if (weatherCondition.includes("rain")) {
      setWicon(rain_icon);
      bgClass = "rainy_bg";
    } else if (weatherCondition.includes("snow")) {
      setWicon(snow_icon);
      bgClass = "snowy_bg";
    } else if (weatherCondition.includes("drizzle")) {
      setWicon(drizzle_icon);
      bgClass = "rainy_bg";
    } else {
      setWicon(clear_icon);
      bgClass = "default_bg";
    }

    // Combine weather condition with time of day
    setBackground(`${bgClass} ${timeOfDay}-mode`);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const search = () => {
    if (city.trim() === "") {
      setError("Please enter a city name!");
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

  // Handle click outside of search suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch city suggestions
  const fetchCitySuggestions = async (searchText) => {
    if (searchText.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${apiKey}`
      );
      const data = await response.json();
      
      // Format suggestions to include state and country
      const formattedSuggestions = data.map(city => ({
        name: city.name,
        state: city.state || '',
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        displayName: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`
      }));
      
      setSuggestions(formattedSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    
    // Debounce the API call
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    window.searchTimeout = setTimeout(() => {
      fetchCitySuggestions(value);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.displayName);
    setShowSuggestions(false);
    fetchWeather(suggestion.name); // Use the city name for weather fetch
  };

  return (
    <>
      <div className={`weather-app-container ${background}`}>
        <div className="weather-content">
          <div className="search-section" ref={searchRef}>
            <input
              type="text"
              className="cityInput"
              placeholder="Search city..."
              value={city}
              onChange={handleInputChange}
              onFocus={() => city.length >= 2 && setShowSuggestions(true)}
            />
            <div className="search-icon" onClick={search}>
              <img src={search_icon} alt="Search" />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="city-name">{suggestion.name}</span>
                    <span className="city-info">
                      {suggestion.state && `${suggestion.state}, `}{suggestion.country}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <div className="time-display">
                <div className="current-time">{formatTime(currentTime)}</div>
                <div className="current-date">{formatDate(currentTime)}</div>
              </div>

              <div className="weather-main">
                <div className="weather-image">
                  <img src={wicon} alt="Weather Icon" />
                </div>
                <div className="weather-temp">{weatherData.temp}</div>
                <div className="weather-location">{weatherData.location}</div>
              </div>

              <div className="weather-details">
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
            </>
          )}
        </div>

        <WeatherForecast city={city} isNight={isNight} />
      </div>
      <WeatherGraphs
        city={city}
        weatherData={weatherData}
        isNight={isNight}
      />
    </>
  );
};

export default CurrentWeather;
