import { useState, useEffect } from 'react';

// pages
import Home from '../pages/Home/Home';

// services
import * as weatherService from '../services/weatherService';

import './App.scss';

function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [city, setCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  const getDeviceLocation = (location) => {
    setCoordinates(location.coords);

    // console.log('Your current position is:');
    // console.log(`Latitude : ${coordinates.latitude}`);
    // console.log(`Longitude: ${coordinates.longitude}`);
    // console.log(`More or less ${coordinates.accuracy} meters.`);
  }

  const failedToGetLocation = (error) => {
    console.warn(`ERROR(${error.code}):
    ${error.message}`);
  }

  const locationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  navigator.geolocation.getCurrentPosition(
      getDeviceLocation,
      failedToGetLocation,
      locationOptions
    );

  useEffect(() => {
    const getWeatherInArea = async () => {
        const weatherData = await weatherService.getWeatherInArea(
            (coordinates?.latitude ? coordinates.latitude : '0'),
            (coordinates?.longitude ? coordinates.longitude : '0'),
            ['minutely']
          );
        // console.log('WEATHER: ', weatherData);
        const cityFromCoordinates = await weatherService.getCityFromLocation(weatherData?.lat, weatherData?.lon);
        setWeatherInfo(weatherData);
        setCity(cityFromCoordinates);
    }

    getWeatherInArea();
  }, [coordinates?.latitude, coordinates?.longitude]);

  return (
    <div className='App'>
      <Home weatherInfo={weatherInfo} city={city} />
    </div>
  );
}

export default App;
