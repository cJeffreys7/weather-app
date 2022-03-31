import React, { useEffect } from 'react';
import Lottie from 'react-lottie-player';
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
            <Lottie 
                loop
                animationData={animationData}
                play
                style={{ width: 400, height: 400 }}
            />
        </div>
    );
};

export default Home;