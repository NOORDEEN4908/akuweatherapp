import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./WeatherGraphs.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherGraphs = () => {
  const [labels, setLabels] = useState([]);
  const [rainfallData, setRainfallData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [windSpeedData, setWindSpeedData] = useState([]);
  const city = "Akurana"; // Change this to your desired city
  const apiKey = "2febae47135f879377604dfd6ab516a2"; // Replace with your OpenWeather API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        const today = new Date(); // Current date and time
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1); // Add 1 day to get tomorrow

const formatDate = (date) => date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

const todayStr = formatDate(today); // Format for today
const tomorrowStr = formatDate(tomorrow); // Format for tomorrow

const data = response.data.list
  .filter((entry) => {
    const entryDate = entry.dt_txt.split(" ")[0]; // Extract date part from dt_txt
    const hour = new Date(entry.dt_txt).getHours(); // Extract hour
    return (entryDate === todayStr || entryDate === tomorrowStr) && hour % 3 === 0; // Filter for today/tomorrow and 3-hour intervals
  })
  .map((entry) => ({
    date: entry.dt_txt.split(" ")[0], // Extract the date (YYYY-MM-DD)
    time: entry.dt_txt, // Full timestamp (YYYY-MM-DD HH:mm:ss)
    rainfall: entry.rain ? entry.rain["3h"] || 0 : 0, // Rainfall for the 3-hour interval
    humidity: entry.main.humidity, // Humidity
    temperature: (entry.main.temp - 273.15).toFixed(2), // Convert Kelvin to Celsius
    windSpeed: entry.wind.speed, // Wind speed
  }));

console.log(data);

      
        setLabels(data.map((entry) => entry.time));
        setRainfallData(data.map((entry) => entry.rainfall));
        setHumidityData(data.map((entry) => entry.humidity));
        setTemperatureData(data.map((entry) => entry.temperature));
        setWindSpeedData(data.map((entry) => entry.windSpeed));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  const createChartData = (data, label, borderColor, backgroundColor) => ({
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        fill: true,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="weather-graphs-container">
      <div className="graph-box">
        <h2>Rainfall</h2>
        <Line data={createChartData(rainfallData, `Rainfall in ${city} (mm)`, "blue", "rgba(0, 0, 255, 0.2)")} options={chartOptions} />
      </div>
      <div className="graph-box">
        <h2>Humidity</h2>
        <Line data={createChartData(humidityData, `Humidity in ${city} (%)`, "green", "rgba(0, 255, 0, 0.2)")} options={chartOptions} />
      </div>
      <div className="graph-box">
        <h2>Temperature</h2>
        <Line data={createChartData(temperatureData, `Temperature in ${city} (°C)`, "red", "rgba(255, 0, 0, 0.2)")} options={chartOptions} />
      </div>
      <div className="graph-box">
        <h2>Wind Speed</h2>
        <Line data={createChartData(windSpeedData, `Wind Speed in ${city} (m/s)`, "orange", "rgba(255, 165, 0, 0.2)")} options={chartOptions} />
      </div>
    </div>
  );
};

export default WeatherGraphs;
