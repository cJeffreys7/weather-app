import React, { useEffect, useState } from 'react';

// components
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// services
import * as weatherService from '../../services/weatherService';
import * as locationService from '../../services/locationService';
import * as tokenService from '../../services/tokenService';

// hooks
import useInterval from '../../hooks/useInterval';

import './Home.scss';
import DropdownSelect from '../../components/DropdownSelect/DropdownSelect';

const Home = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [formData, setFormData] = useState({
        searchCity: '',
        displayCity: '',
        searchState: '',
        searchCountry: '',
        searchCoordinates: ''
    });
    const [searchOptions, setSearchOptions] = useState({
        stateOptions: [],
        cityOptions: []
    });

    const {
        searchCity,
        displayCity,
        searchState,
        searchCountry,
        searchCoordinates
    } = formData;

    const getCurrentCoordinates = () => {
        const coordinates = tokenService.getToken('coordinates_token')?.split(',');
        if (coordinates) {
            const formattedCoordinates = {
                latitude: parseFloat(coordinates[0].substring(1)),
                longitude: parseFloat(coordinates[1])
            }
            setFormData({
                ...formData,
                searchCoordinates: formattedCoordinates
            })
        }
    }

    useInterval(() => {
        getCurrentCoordinates();
        console.warn('ANOTHER ATTEMPT TO GET COORDINATES');
    }, 1000, searchCoordinates.length === 0);

    useEffect(() => {

        getCurrentCoordinates();
    }, []);

    const handleSubmit = async () => {
        const result = await locationService.getLocationFromCity(searchCity, searchState);
        const coordinates = {
            latitude: result[0].lat,
            longitude: result[0].lon
        }
        setFormData({
            ...formData,
            searchCoordinates: coordinates
        })
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const getCitiesOfState = async (state) => {
            if (state) {
                setFormData({
                    ...formData,
                    searchCity: '',
                })
                const cities = await locationService.getCitiesOfState(state);
                console.log('CITIES: ', cities);
                setSearchOptions({
                    ...searchOptions,
                    cityOptions: cities
                })
            }
        }

        getCitiesOfState(searchState);
    }, [searchState])

    useEffect(() => {
        const getStatesOfCountry = async (countryCode) => {
            if (countryCode) {
                const states = await locationService.getStatesOfCountry(countryCode);
                console.log('STATES: ', states);
                setSearchOptions({
                    ...searchOptions,
                    stateOptions: states
                })
            }
        }
        console.log('SEARCH COUNTRY: ', searchCountry);
        getStatesOfCountry(searchCountry);
    }, [searchCountry])

    useEffect(() => {
        const getCurrentWeatherInArea = async (coordinates) => {
            const weatherData = await weatherService.getCurrentWeatherInArea(
                (coordinates?.latitude ? coordinates.latitude : '0'),
                (coordinates?.longitude ? coordinates.longitude : '0')
            );
            console.log('WEATHER: ', weatherData);
            setCurrentWeather(weatherData);
        }

        const getLocationFromCoordinates = async (coordinates) => {
            const location = await locationService.getLocationFromCoordinates(coordinates);
            console.log('LOCATION FROM COORDINATES: ', location);
            setFormData({
                ...formData,
                searchCountry: location.countryCode
            })
        }

        const getCityFromLocation = async (coordinates) => {
            const city = await locationService.getCityFromLocation(coordinates);
            setFormData({
                ...formData,
                displayCity: city
            })
        }

        console.log('GET COORDINATES: ', searchCoordinates);
        if (searchCoordinates) {
            getCurrentWeatherInArea(searchCoordinates);
            getLocationFromCoordinates(searchCoordinates);
            getCityFromLocation(searchCoordinates);
        }
        setFormData({
            ...formData,
            displayCity: formData.searchCity
        })
    }, [searchCoordinates]);

    const currentTemperature = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp);
    const dailyHigh = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp_max);
    const dailyLow = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp_min);
    const weatherCondition = weatherService.getWeatherConditionFromWeatherCode(currentWeather?.weather[0]?.icon);

    const isFormInvalid = !(searchCity && searchState);

    const { stateOptions, cityOptions } = searchOptions;

    return (
        <div className='home-wrapper'>
            <WeatherCard
                city={displayCity}
                weatherCondition={weatherCondition}
                temperature={currentTemperature}
                high={dailyHigh}
                low={dailyLow}
                fullCard={true}
            />
            <form className='city-search-form'>
                <DropdownSelect
                    label='City'
                    name='searchCity'
                    options={cityOptions}
                    onChange={handleChange}
                />
                <DropdownSelect
                    label='State'
                    name='searchState'
                    options={stateOptions}
                    onChange={handleChange}
                />
                <Button
                    onClick={handleSubmit}
                    disabled={isFormInvalid}
                >
                    Search By City
                </Button>
            </form>
        </div>
    );
};

export default Home;