const getWeatherInArea = async (latitude, longitude, part) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => res.json());
}

export {
    getWeatherInArea
}