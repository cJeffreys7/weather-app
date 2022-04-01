import React, { useEffect, useState } from 'react';

// components
import WeatherCard from '../../components/WeatherCard/WeatherCard';
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
                latitude: parseFloat(coordinates[0]),
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
                setSearchOptions({
                    ...searchOptions,
                    stateOptions: states
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
            console.log('WEATHER: ', weatherData);
            setCurrentWeather(weatherData);
        }

        const updateLocationFromCoordinates = async (coordinates) => {
            const location = await locationService.getLocationFromCoordinates(coordinates);
            console.log('UPDATED LOCATION: ', location);
            const updatedCountry = location.countryCode;
            // const updatedState = location.localityInfo.administrative[1].name;
            const updatedCity = location.locality;

            setFormData({
                ...formData,
                displayCity: updatedCity,
                // searchState: updatedState,
                searchCountry: updatedCountry
            })
        }

        if (searchCoordinates) {
            updateLocationFromCoordinates(searchCoordinates);
            getCurrentWeatherInArea(searchCoordinates);
            console.log('UPDATE LOCATION FROM COORDINATES: ', searchCoordinates);
        }
        // setFormData({
        //     ...formData,
        //     searchCity: formData.displayCity
        // })
        
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
                    label='State'
                    name='searchState'
                    value={searchState}
                    options={stateOptions}
                    onChange={handleChange}
                />
                <DropdownSelect
                    label='City'
                    name='searchCity'
                    value={searchCity}
                    options={cityOptions}
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