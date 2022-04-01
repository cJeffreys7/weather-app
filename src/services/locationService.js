// services
import * as tokenService from '../services/tokenService'

const getLocationFromCoordinates = async (coordinates) => {
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    console.log('GETTING LOCATION FROM: ', latitude, longitude);
    const result = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(res => res.json());
    return result;
}

const getCityFromLocation = async (coordinates) => {
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    console.log('GETTING CITY FROM: ', latitude, longitude);
    const result = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(res => res.json());
    return result.locality;
}

const getLocationFromCity = async (city, state) => {
    const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(res => res.json());
    return result;
}

const getCountryNameFromCountryCode = async (countryCode) => {
    console.log('SEARCHING FOR COUNTRY NAME FROM CODE: ', countryCode);
    const authToken = await getAuthTokenForCountryStateCity();
    console.log('AUTH TOKEN FOR COUNTRY CODE: ', authToken);
    const result = await fetch(`https://www.universal-tutorial.com/api/countries/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': authToken,
        }
    })
    .then(res => res.json())
    .catch(err => console.error('ERROR: ', err));
    console.log('COUNTRIES: ', result);
    let countryName;
    result.every(country => {
        if (country.country_short_name === countryCode) {
            countryName = country.country_name;
        }
        return !countryName;
    })
    return countryName;
}

const getStatesOfCountry = async (countryCode) => {
    const country = await getCountryNameFromCountryCode(countryCode);
    console.log('COUNTRY FROM COUNTRY CODE: ', country);
    const authToken = await getAuthTokenForCountryStateCity();
    console.log('AUTH TOKEN FOR STATES OF COUNTRY: ', authToken);
    const result = await fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': authToken,
        }
    })
    .then(res => res.json())
    .catch(err => console.error('ERROR: ', err));
    return result;
}

const getCitiesOfState = async (state) => {
    const authToken = await getAuthTokenForCountryStateCity();
    const result = await fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': authToken,
        }
    })
    .then(res => res.json())
    .catch(err => console.error('ERROR: ', err));
    return result;
}

const getAuthTokenForCountryStateCity = async () => {
    if (tokenService.getBearerToken('auth_token')) {
        console.log('FOUND AUTH TOKEN: ', tokenService.getBearerToken('auth_token'));
    } else {
        console.log('DID NOT FIND AUTH TOKEN');
        const result = await fetch(`https://www.universal-tutorial.com/api/getaccesstoken`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'api-token': process.env.REACT_APP_COUNTRY_STATE_CITY_API_TOKEN,
                'user-email': process.env.REACT_APP_COUNTRY_STATE_CITY_USER_EMAIL
            }
        }).then(res => res.json());
        tokenService.setToken('auth_token', result.auth_token);
    }
    return tokenService.getBearerToken('auth_token');
}

export {
    getLocationFromCoordinates,
    getCityFromLocation,
    getLocationFromCity,
    getCountryNameFromCountryCode,
    getStatesOfCountry,
    getCitiesOfState,
    getAuthTokenForCountryStateCity
}