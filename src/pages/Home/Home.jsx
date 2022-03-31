import React, { useEffect } from 'react';
import CardComponent from '../../components/WeatherCard/WeatherCard';
import WeatherCondition from '../../components/WeatherCondition/WeatherCondition';
import animationData from '../../lotties/sunny.json';

// services
import * as weatherService from '../../services/weatherService';

const Home = () => {
    useEffect(() => {
        const getWeatherInArea = async () => {
            const weatherInfo = await weatherService.getWeatherInArea(32.776665, -96.796989, ['minutely']);
            console.log('WEATHER: ', weatherInfo);
        }

        getWeatherInArea();
    }, []);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div>
            Weather App
            <CardComponent weatherCondition='heavy_thunderstorm'/>
        </div>
    );
};

export default Home;