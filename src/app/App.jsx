import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// pages
import Home from '../pages/Home/Home';
import HourlyWeather from '../pages/HourlyWeather/HourlyWeather';

// services
import * as locationService from '../services/locationService';

import './App.scss';

function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const getDeviceCurrentLocation = async () => {
      let location = null;
      
      const getDeviceLocation = async (location) => {
        location = location.coords;
        
        if (location) {
          setCoordinates(location);
          const cityFromCoordinates = await locationService.getCityFromLocation(location?.latitude, location?.longitude);
          setCity(cityFromCoordinates);
        }
    
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
    }

    getDeviceCurrentLocation();
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/home' element={<Home city={city} coordinates={coordinates} />}/>
        <Route path='/hourly-weather' element={<HourlyWeather />} />
      </Routes>
    </div>
  );
}

export default App;
