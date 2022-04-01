import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

// pages
import Home from '../pages/Home/Home';
import HourlyWeather from '../pages/HourlyWeather/HourlyWeather';

// services
import * as locationService from '../services/locationService';
import * as tokenService from '../services/tokenService';

import './App.scss';

function App() {

  useEffect(() => {
    const getDeviceCurrentLocation = async () => {
      
      const getDeviceLocation = async (deviceCoordinates) => {
        if (deviceCoordinates.coords) {
          tokenService.setToken('coordinates_token', `$${deviceCoordinates.coords.latitude},${deviceCoordinates.coords.longitude}`);
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
      <NavBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/hourly-weather' element={<HourlyWeather />} />
      </Routes>
    </div>
  );
}

export default App;
