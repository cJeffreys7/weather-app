const getWeatherInArea = async (latitude, longitude, part) => {
    return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(res => res.json());
}

const getFahrenheitTemperature = (kelvinTemperature) => {
    const fahrenheitTemperature = ((kelvinTemperature - 273.15) * 9/5 + 32).toFixed(0);
    return fahrenheitTemperature;
}

const getCityFromLocation = async (latitude, longitude) => {
    const result = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(res => res.json());
    // console.log('CITY RESULT: ', result);
    return result.locality;
}

export {
    getWeatherInArea,
    getFahrenheitTemperature,
    getCityFromLocation
}