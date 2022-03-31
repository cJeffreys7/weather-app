import React from 'react';

import { useNavigate } from 'react-router-dom';

// components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import WeatherCondition from '../WeatherCondition/WeatherCondition';

import './WeatherCard.scss'

const WeatherCard = ({ city, temperature, weatherCondition, time, high, low, fullCard }) => {
    const navigate = useNavigate();

    const weatherAnimationSize = fullCard ? 400 : 50;
    const minWidth = fullCard ? 275 : 75;

    const handleClick = () => {
        navigate('/hourly-weather')
    }

    return (
        <Box sx={{ minWidth: minWidth }}>
            <Card variant="outlined">
                <CardContent>
                    {fullCard && 
                        <Typography sx={{ fontSize: 32 }} gutterBottom>
                        {city ?
                            city 
                            :
                            <Skeleton variant='text' />}
                        </Typography>
                    }
                    <Typography variant="h5" component="div">
                    {city && temperature ?
                        <span>{temperature} &#x2109;</span>
                        :
                        <Skeleton variant='text' />}
                    </Typography>
                    {city && weatherCondition ? 
                        <WeatherCondition weatherType={weatherCondition} animationSize={weatherAnimationSize} />
                        :
                        <Skeleton variant='circular' width={weatherAnimationSize} height={weatherAnimationSize} />}
                    {fullCard ? 
                        <Typography variant="body2">
                            {high && city ?
                                <span>High: {high} &#x2109;</span>
                                :
                                <Skeleton variant='text' />}
                            <br />
                            {low && city ?
                                <span>Low: {low} &#x2109;</span>
                                :
                                <Skeleton variant='text' />}
                        </Typography>
                        :
                        <Typography variant="body2">
                            {time}
                        </Typography>
                    }
                </CardContent>
                {fullCard && 
                    <CardActions>
                        <Button
                            size="small"
                            onClick={handleClick}
                        >
                            See Hourly Weather
                        </Button>
                    </CardActions>
                }
            </Card>
        </Box>
    );
};

export default WeatherCard;