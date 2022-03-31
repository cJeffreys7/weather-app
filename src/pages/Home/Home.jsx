import React, { useEffect, useState } from 'react';

// components
import WeatherCard from '../../components/WeatherCard/WeatherCard';

// services
import * as weatherService from '../../services/weatherService';

const Home = ({ city, coordinates }) => {
    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        const getCurrentWeatherInArea = async () => {
            const weatherData = await weatherService.getCurrentWeatherInArea(
                (coordinates?.latitude ? coordinates.latitude : '0'),
                (coordinates?.longitude ? coordinates.longitude : '0')
            );
            console.log('WEATHER: ', weatherData);
            setCurrentWeather(weatherData);
        }

        getCurrentWeatherInArea();
    }, [coordinates]);

    const currentTemperature = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp);
    const dailyHigh = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp_max);
    const dailyLow = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp_min);
    const weatherCondition = weatherService.getWeatherConditionFromWeatherCode(currentWeather?.weather[0]?.icon);

    return (
        <div>
            <WeatherCard
                city={city}
                weatherCondition={weatherCondition}
                temperature={currentTemperature}
                high={dailyHigh}
                low={dailyLow}
                fullCard={true}
            />
        </div>
    );
};

export default Home;