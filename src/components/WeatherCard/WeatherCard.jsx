import React from 'react';

// components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import WeatherCondition from '../WeatherCondition/WeatherCondition';

const WeatherCard = ({ city, temperature, weatherCondition, high, low }) => {

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {city 
                        ? city 
                        : <Skeleton variant='text' />}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {temperature && city 
                        ? <span>{temperature} &#x2109;</span>
                        : <Skeleton variant='text' />}
                    </Typography>
                    {weatherCondition && city ? 
                        <WeatherCondition weatherType={weatherCondition} />
                        : <Skeleton variant='circular' width={400} height={400} />}
                    <Typography variant="body2">
                    {high && city 
                        ? <span>{high} &#x2109;</span>
                        : <Skeleton variant='text' />}
                    <br />
                    {low && city
                        ? <span>{low} &#x2109;</span>
                        : <Skeleton variant='text' />}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">See Hourly Weather</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default WeatherCard;