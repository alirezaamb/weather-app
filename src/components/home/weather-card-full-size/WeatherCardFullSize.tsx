import { WeatherDataType } from '../../../types/type';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import sunnyAnimation from '../../../../public/videos/sunnyAnimation.json';
import cloudyAnimation from '../../../../public/videos/cloudyAnimation.json';

export const WeatherCard = ({
  weatherData,
}: {
  weatherData: WeatherDataType;
}) => {
  const { city, country, temperature, feelsLike, description } = weatherData;

  let WeatherIcon;
  if (description.toLowerCase().includes('clear')) {
    WeatherIcon = sunnyAnimation;
  } else if (description.toLowerCase().includes('cloud')) {
    WeatherIcon = cloudyAnimation;
  } else {
    WeatherIcon = sunnyAnimation;
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: WeatherIcon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: '100%', sm: 300 },
        margin: { xs: '10px', sm: 'auto' },
        marginTop: '20px',
        opacity: 0.9,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 1 }}
      >
        <CardHeader
          title={
            <Typography variant="h6" component="div">
              {city}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {country}
            </Typography>
          }
          sx={{ p: 0 }}
        />
        <Box sx={{ height: { xs: 80, sm: 100 }, width: { xs: 80, sm: 100 } }}>
          <Lottie options={defaultOptions} height="100%" width="100%" />
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h6">Temperature: {temperature}°C</Typography>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Feels Like: {feelsLike}°C
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
