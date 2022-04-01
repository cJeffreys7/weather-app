import React, { useState, useEffect } from 'react';
import WeatherCard from '../../components/WeatherCard/WeatherCard';

// services
import * as weatherService from '../../services/weatherService';
import * as locationService from '../../services/locationService';
import * as tokenService from '../../services/tokenService';

// hooks
import useInterval from '../../hooks/useInterval';

import './HourlyWeather.scss';

const HourlyWeather = () => {
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [city, setCity] = useState(null);

    const getCurrentCoordinates = async () => {
        const updatedCoordinates = tokenService.getToken('coordinates_token')?.split(',');
        console.warn('UPDATED COORDINATES: ', updatedCoordinates);
        if (updatedCoordinates) {
            const formattedCoordinates = {
                latitude: parseFloat(updatedCoordinates[0]),
                longitude: parseFloat(updatedCoordinates[1])
            }
            setCoordinates(formattedCoordinates);
            const updatedCity = await locationService.getCityFromLocation(formattedCoordinates);
            setCity(updatedCity);
        }
    }

    useInterval(() => {
        getCurrentCoordinates();
        console.warn('ANOTHER ATTEMPT TO GET COORDINATES');
    }, 1000, coordinates?.length === 0);

    useEffect(() => {
        getCurrentCoordinates();
    }, [])

    useEffect(() => {
        const getHourlyWeatherForNext48Hours = async () => {
            const weatherData = await weatherService.getHourlyWeatherForNext48Hours(
                (coordinates?.latitude ? coordinates.latitude : '0'),
                (coordinates?.longitude ? coordinates.longitude : '0'),
                ['current', 'minutely', 'daily', 'alerts']
            );
            setHourlyWeather(weatherData.hourly);
            // weatherData.hourly.forEach(hourlyWeather => {
            //     console.log(new Date(parseInt(hourlyWeather.dt + "000")).toLocaleTimeString());
            // })
        }

        getHourlyWeatherForNext48Hours();
    }, [coordinates]);

    return (
        <div className='hourly-weather-wrapper'>
            <h1>
                {city} Hourly Weather
            </h1>
            <div className="weather-cards">
                {hourlyWeather?.map((hourWeather, index) => {
                    const temperature = weatherService.getFahrenheitTemperature(hourWeather?.temp);
                    const weatherCondition = weatherService.getWeatherConditionFromWeatherCode(hourWeather?.weather[0]?.icon);
                    const time24Hours = new Date(parseInt(hourWeather.dt + "000")).getHours();
                    const formattedTime = time24Hours >= 12 ? time24Hours === 12 ? `12 PM` : `${time24Hours - 12} PM` : time24Hours === 0 ? `12 AM` : `${time24Hours} AM`
                    
                    return <WeatherCard
                        city={city}
                        temperature={temperature}
                        weatherCondition={weatherCondition}
                        time={formattedTime}
                        key={index}
                    />
                })}
            </div>
        </div>
    );
};

export default HourlyWeather;