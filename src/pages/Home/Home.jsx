import React, { useEffect, useState } from 'react';

// components
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import DropdownSelect from '../../components/DropdownSelect/DropdownSelect';
import Button from '@mui/material/Button';

// services
import * as weatherService from '../../services/weatherService';
import * as locationService from '../../services/locationService';
import * as tokenService from '../../services/tokenService';

// hooks
import useInterval from '../../hooks/useInterval';

import './Home.scss';

const getCurrentCoordinates = () => {
    const coordinates = tokenService.getToken('coordinates_token')?.split(',');
    if (coordinates) {
        const formattedCoordinates = {
            latitude: parseFloat(coordinates[0]),
            longitude: parseFloat(coordinates[1])
        }
        return formattedCoordinates;
    }
}

const getCountries = async () => {
    const countries = await locationService.getCountries();
    return countries;
}

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
        countryOptions: [],
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

    const { countryOptions, stateOptions, cityOptions } = searchOptions;

    useInterval(() => {
        const getCurrentCountry = async () => {
            console.log('CURRENT COORDINATES BEFORE UPDATE: ', searchCoordinates);
            if (searchCoordinates.length === 0) {
                const coordinates = getCurrentCoordinates();
                setFormData({
                    ...formData,
                    searchCoordinates: coordinates
                })
            }
            console.warn('CURRENT COUNTRIES BEFORE UPDATE: ', searchOptions.countryOptions);
            if (countryOptions.length === 0) {
                const countries = await getCountries();
                setSearchOptions({
                        ...searchOptions,
                        countryOptions: countries
                })
            }
        }

        getCurrentCountry();
        console.log('ATTEMPTING TO UPDATE COORDINATES, CONDITIO: ', searchCoordinates.length === 0);
        console.log('ATTEMPTING TO UPDATE COUNTRIES, CONDITION: ', countryOptions.length === 0);
    }, 1000, searchCoordinates.length === 0 && searchOptions.countryOptions.length === 0);

    useEffect(() => {
        const getCurrentCountry = async () => {
            const countries = await getCountries();
            console.warn('COUNTRIES: ', countries);
            setSearchOptions({
                    ...searchOptions,
                    countryOptions: countries
            })
            const coordinates = getCurrentCoordinates();
            console.log('CURRENT COORDINATES: ', coordinates);
            setFormData({
                ...formData,
                searchCoordinates: coordinates
            })
        }

        getCurrentCountry();
    }, []);

    const handleSubmit = async () => {
        const result = await locationService.getLocationFromCity(searchCity, searchState);
        const coordinates = {
            latitude: result[0].lat,
            longitude: result[0].lon
        }
        tokenService.setToken('coordinates_token', `$${coordinates.latitude},${coordinates.longitude}`)
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
        console.log(`CHANGING STATE ${e.target.name}: ${e.target.value}`);
    }

    useEffect(() => {
        const getCitiesOfState = async (state) => {
            if (state) {
                setFormData({
                    ...formData,
                    searchCity: '',
                })
                const cities = await locationService.getCitiesOfState(state);
                console.log(`CITIES OF ${state}: `, cities);
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
                console.log(`STATES OF ${countryCode}: `, states);
                setSearchOptions({
                    ...searchOptions,
                    stateOptions: states
                })
                setFormData({
                    ...formData,
                    searchState: '',
                    searchCity: ''
                })
            }
        }
        getStatesOfCountry(searchCountry);
    }, [searchCountry])

    useEffect(() => {
        

        const getCurrentWeatherInArea = async (coordinates) => {
            const weatherData = await weatherService.getCurrentWeatherInArea(
                (coordinates?.latitude ? coordinates.latitude : '0'),
                (coordinates?.longitude ? coordinates.longitude : '0')
            );
            // console.log('WEATHER: ', weatherData);
            if (weatherData) {
                setCurrentWeather(weatherData);
            }
        }

        const updateLocationFromCoordinates = async (coordinates) => {
            const location = await locationService.getLocationFromCoordinates(coordinates);
            const updatedCountry = await locationService.getCountryNameFromCountryCode(location.countryCode);
            const updatedCity = location.locality;
            // const updatedState = location.localityInfo.administrative[1].name;

            setFormData({
                ...formData,
                displayCity: updatedCity,
                searchCountry: updatedCountry
                // searchState: updatedState,
            })
        }

        if (searchCoordinates) {
            updateLocationFromCoordinates(searchCoordinates);
            getCurrentWeatherInArea(searchCoordinates);
        }
        
    }, [searchCoordinates]);

    const currentTemperature = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp);
    const dailyHigh = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp_max);
    const dailyLow = weatherService.getFahrenheitTemperature(currentWeather?.main?.temp_min);
    const weatherCondition = weatherService.getWeatherConditionFromWeatherCode(currentWeather?.weather[0]?.icon);

    const isFormInvalid = !(searchCity && searchState);

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
                    label='Country'
                    name='searchCountry'
                    value={searchCountry}
                    options={countryOptions}
                    valueIndex={1}
                    displayIndex={0}
                    onChange={handleChange}
                />
                {stateOptions && 
                    <DropdownSelect
                        label='State'
                        name='searchState'
                        value={searchState}
                        options={stateOptions}
                        onChange={handleChange}
                    />
                }
                {cityOptions && 
                    <DropdownSelect
                        label='City'
                        name='searchCity'
                        value={searchCity}
                        options={cityOptions}
                        onChange={handleChange}
                    />
                }
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