import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';
import './App.css';
import Login from './Login';

function GfGWeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toDateFunction = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const WeekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    return `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/forecast'; // Use the forecast endpoint
      const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
      try {
        const res = await axios.get(url, {
          params: {
            q: input,
            units: 'metric',
            appid: api_key,
          },
        });
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        setInput('');
        console.log('error', error);
      }
    }
  };
  

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <h1 className="app-name">WEATHERWISE</h1>
          <div className="search-bar">
            <input
              type="text"
              className="city-search"
              placeholder="Enter City Name.."
              name="query"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyPress={search}
            />
          </div>
          {weather.loading && (
            <>
              <br />
              <br />
              <Oval color="black" height={100} width={100} />
            </>
          )}
          {weather.error && (
            <>
              <br />
              <br />
              <span className="error-message">
                <FontAwesomeIcon icon={faFrown} />
                <span style={{ fontSize: '30px' }}>City not found</span>
              </span>
            </>
          )}
          {weather.data && weather.data.list && (
  <div>
    <div className="city-name">
      <h2>
        {weather.data.city.name}, {weather.data.city.country}
      </h2>
    </div>
    <div className="date">
      <span>Hourly Forecast</span>
    </div>
    <div className="hourly-forecast">
      {weather.data.list.map((forecast) => (
        <div key={forecast.dt} className="hourly-forecast-item">
          <div className="hour">{new Date(forecast.dt * 1000).getHours()}:00</div>
          <img
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt={forecast.weather[0].description}
          />
          {Math.round(forecast.main.temp)}
          <sup className="deg">°C</sup>
        </div>
      ))}
    </div>
  </div>
)}

        </div>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default GfGWeatherApp;