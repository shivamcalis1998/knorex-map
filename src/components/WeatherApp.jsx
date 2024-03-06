import React, { useState, useEffect } from "react";
import { FaSoundcloud, FaCloud, FaCloudShowersHeavy } from "react-icons/fa";
import { BsFillCloudSunFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";

import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("Ho Chi Minh");
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=df47cfcdc9ee16651de3a359aa31819d`
        );
        const data = await response.json();
        setForecastData(
          data.list.filter((item, index) => index % 8 === 0).slice(0, 4)
        );
      } catch (error) {
        setError("Error fetching weather data");
        console.error("Error fetching weather data: ", error);
      }
    };
    fetchWeatherData();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getWeatherIcon = (description) => {
    switch (description) {
      case "few clouds":
        return <BsFillCloudSunFill />;
      case "broken clouds":
      case "scattered clouds":
        return <FaSoundcloud />;
      case "overcast clouds":
        return <FaCloud />;
      case "moderate rain":
      case "light rain":
        return <FaCloudShowersHeavy />;
      case "clear sky":
        return <IoMdSunny />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = date.getMonth();

    if (date.toDateString() === today.toDateString()) {
      return "Current Weather";
    } else {
      return `${day}/${monthNames[monthIndex]}`;
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <h2>Weather Forecast for the next 3 days in {city}:</h2>
      {forecastData.length > 0 && (
        <div className="container">
          <select
            className="selectTag"
            value={city}
            onChange={handleCityChange}
          >
            <option value="Ho Chi Minh">Ho Chi Minh</option>
            <option value="Singapore">Singapore</option>
            <option value="Kuala Lumpur">Kuala Lumpur</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Athens">Athens</option>
          </select>
          <div className="mainBox">
            {forecastData.map((forecast, index) => (
              <div key={index} className="singleBox">
                <p>{formatDate(forecast.dt_txt)}</p>
                <div className="singleBox">
                  <p>{(forecast.main.temp - 273.15).toFixed(2)}°C</p>
                  <div className="weatherIcon">
                    {getWeatherIcon(forecast.weather[0].description)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherApp;
