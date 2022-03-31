import React from 'react';

// components
import WeatherCard from '../../components/WeatherCard/WeatherCard';

// services
import * as weatherService from '../../services/weatherService';

const Home = ({ weatherInfo, city }) => {

    const currentTemperature = weatherService.getFahrenheitTemperature(weatherInfo?.current?.temp);
    const dailyHigh = weatherService.getFahrenheitTemperature(weatherInfo?.daily[0]?.temp?.max);
    const dailyLow = weatherService.getFahrenheitTemperature(weatherInfo?.daily[0]?.temp?.min);

    return (
        <div>
            <WeatherCard city={city} weatherCondition='heavy_thunderstorm' temperature={currentTemperature} high={dailyHigh} low={dailyLow} />
        </div>
    );
};

export default Home;