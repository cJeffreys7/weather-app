import React from 'react';

// components
import WeatherCard from '../../components/WeatherCard/WeatherCard';

// services
import * as weatherService from '../../services/weatherService';

const Home = ({ weatherInfo, city }) => {

    const currentTemperature = weatherService.getFahrenheitTemperature(weatherInfo?.main?.temp);
    const dailyHigh = weatherService.getFahrenheitTemperature(weatherInfo?.main?.temp_max);
    const dailyLow = weatherService.getFahrenheitTemperature(weatherInfo?.main?.temp_min);
    const weatherCondition = weatherService.getWeatherConditionFromWeatherCode(weatherInfo?.weather[0]?.icon);

    return (
        <div>
            <WeatherCard city={city} weatherCondition={weatherCondition} temperature={currentTemperature} high={dailyHigh} low={dailyLow} />
        </div>
    );
};

export default Home;