const getCurrentWeatherInArea = async (latitude, longitude) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => res.json());
}

const getHourlyWeatherForNext48Hours = async (latitude, longitude, excludeList) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exlude=${excludeList}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => res.json());
}

const getWeatherConditionFromWeatherCode = (weatherCode) => {
    switch(weatherCode) {
        case '01d':
            return 'sunny';
        case '01n':
            return 'clear_night';
        case '02d':
            return 'partly_cloudy_sunny';
        case '02n':
            return 'partly_cloudy_night';
        case '03d':
            return 'cloudy_windy';
        case '03n':
            return 'cloudy_windy';
        case '04d':
            return 'cloudy_windy';
        case '04n':
            return 'cloudy_windy';
        case '09d':
            return 'light_rain';
        case '09n':
            return 'night_rain';
        case '10d':
            return 'light_rain';
        case '10n':
            return 'night_rain';
        case '11d':
            return 'heavy_thunderstorm';
        case '11n':
            return 'heavy_thunderstorm';
        case '13d':
            return 'heavy_snow';
        case '13n':
            return 'heavy_snow';
        case '50d':
            return 'heavy_fog';
        case '50n':
            return 'heavy_fog';
        default:
            return null;
    }
}

const getFahrenheitTemperature = (kelvinTemperature) => {
    const fahrenheitTemperature = kelvinTemperature ? ((kelvinTemperature - 273.15) * 9/5 + 32).toFixed(0) : null;
    return fahrenheitTemperature;
}

export {
    getCurrentWeatherInArea,
    getHourlyWeatherForNext48Hours,
    getWeatherConditionFromWeatherCode,
    getFahrenheitTemperature
}