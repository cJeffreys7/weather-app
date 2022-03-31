import React, { useState, useEffect } from 'react';
import WeatherCard from '../../components/WeatherCard/WeatherCard';

// services
import * as weatherService from '../../services/weatherService';

import './HourlyWeather.scss';

const HourlyWeather = ({ city, coordinates }) => {
    const [hourlyWeather, setHourlyWeather] = useState(null);

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
            Hourly Weather
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