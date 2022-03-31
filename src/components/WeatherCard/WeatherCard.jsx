import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import WeatherCondition from '../WeatherCondition/WeatherCondition';

const WeatherCard = ({ city, temperature, weatherCondition, high, low }) => {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {city ? city : 'City'}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {temperature ? temperature : 'Current Temperature'}
                    </Typography>
                    {weatherCondition ? <WeatherCondition weatherType={weatherCondition} /> : 'Weather Condition'}
                    <Typography variant="body2">
                    {high ? high : 'High for the Day'}
                    <br />
                    {low ? low : 'Low for the Day'}
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