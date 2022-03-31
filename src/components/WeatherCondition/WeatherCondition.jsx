import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

// Animations
import clearNightAnimation from '../../lotties/clear-night.json';
import cloudyThunderstormAnimation from '../../lotties/cloudy-thunderstorm.json';
import cloudyWindyAnimation from '../../lotties/cloudy-windy.json';
import heavyFogAnimation from '../../lotties/heavy-fog.json';
import heavySnowAnimation from '../../lotties/heavy-snow.json';
import heavyThunderstormAnimation from '../../lotties/heavy-thunderstorm.json';
import lightFogAnimation from '../../lotties/light-fog.json';
import lightRainAnimation from '../../lotties/light-rain.json';
import lightSnowAnimation from '../../lotties/light-snow.json';
import lightThunderstormAnimation from '../../lotties/light-thunderstorm.json';
import nightRainAnimation from '../../lotties/night-rain.json';
import nightSnowAnimation from '../../lotties/night-snow.json';
import partlyCloudyNightAnimation from '../../lotties/partly-cloudy-night.json';
import partlyCloudySunnyAnimation from '../../lotties/partly-cloudy-sunny.json';
import sunnyAnimation from '../../lotties/sunny.json';

const WeatherCondition = ({ weatherType, animationSize }) => {
    const [weatherAnimation, setWeatherAnimation] = useState(sunnyAnimation);

    const weatherTypes = [
        'clear_night',
        'cloudy_thunderstorm',
        'cloudy_windy',
        'heavy_fog',
        'heavy_snow',
        'heavy_thunderstorm',
        'light_fog',
        'light_rain',
        'light_snow',
        'light_thunderstorm',
        'night_rain',
        'night_snow',
        'partly_cloudy_night',
        'partly_cloudy_sunny',
        'sunny'
    ];

    const selectWeatherAnimation = (weatherType) => {
        switch(weatherType) {
            case 'clear_night':
                setWeatherAnimation(clearNightAnimation);
                break;
            case 'cloudy_thunderstorm':
                setWeatherAnimation(cloudyThunderstormAnimation);
                break;
            case 'cloudy_windy':
                setWeatherAnimation(cloudyWindyAnimation);
                break;
            case 'heavy_fog':
                setWeatherAnimation(heavyFogAnimation);
                break;
            case 'heavy_snow':
                setWeatherAnimation(heavySnowAnimation);
                break;
            case 'heavy_thunderstorm':
                setWeatherAnimation(heavyThunderstormAnimation);
                break;
            case 'light_fog':
                setWeatherAnimation(lightFogAnimation);
                break;
            case 'light_rain':
                setWeatherAnimation(lightRainAnimation);
                break;
            case 'light_snow':
                setWeatherAnimation(lightSnowAnimation);
                break;
            case 'light_thunderstorm':
                setWeatherAnimation(lightThunderstormAnimation);
                break;
            case 'night_rain':
                setWeatherAnimation(nightRainAnimation);
                break;
            case 'night_snow':
                setWeatherAnimation(nightSnowAnimation);
                break;
            case 'partly_cloudy_night':
                setWeatherAnimation(partlyCloudyNightAnimation);
                break;
            case 'partly_cloudy_sunny':
                setWeatherAnimation(partlyCloudySunnyAnimation);
                break;
            case 'sunny':
                setWeatherAnimation(sunnyAnimation);
                break;
            default:
                setWeatherAnimation(sunnyAnimation);
        }
    };

    useEffect(() => {
        const currentWeatherCondition = weatherType.toLowerCase();
        if (weatherTypes.includes(currentWeatherCondition)) {
            selectWeatherAnimation(currentWeatherCondition);
        } else {
            console.warn(`Unable to find ${weatherType} weather condition`)
        }
    }, [weatherType]);

    return (
        <div className='weather-animation-wrapper'>
            <Lottie 
                loop
                animationData={weatherAnimation}
                play
                style={{ width: animationSize, height: animationSize }}
            />
        </div>
    );
};

export default WeatherCondition;