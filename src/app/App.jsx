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
  const [locationData, setLocationData] = useState({
    coordinates: null,
    country: null,
    city: null
  })

  useEffect(() => {
    const getDeviceCurrentLocation = async () => {
      
      const getDeviceLocation = async (deviceCoordinates) => {
        console.log('COORDINATES: ', deviceCoordinates);
        if (deviceCoordinates.coords) {
          const formattedCoordinates = {
            latitude: deviceCoordinates.coords.latitude,
            longitude: deviceCoordinates.coords.longitude
          }
          const location = await locationService.getLocationFromCoordinates(formattedCoordinates);
          console.warn('LOCATION: ', location);
          const cityFromCoordinates = location.locality;
          const countryFromCoordinates = location.countryCode;
          tokenService.setToken('coordinates_token', `$${deviceCoordinates.coords.latitude},${deviceCoordinates.coords.longitude}`)
          setLocationData({
            coordinates: formattedCoordinates,
            country: countryFromCoordinates,
            city: cityFromCoordinates
          })
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

  const { city } = locationData;

  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/hourly-weather' element={<HourlyWeather city={city} />} />
      </Routes>
    </div>
  );
}

export default App;
