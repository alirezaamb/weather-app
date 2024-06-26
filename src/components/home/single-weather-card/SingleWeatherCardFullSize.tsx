import { WeatherDataType } from '../../../types/type';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import sunnyAnimation from '../../../../public/videos/sunnyAnimation.json';
import cloudyAnimation from '../../../../public/videos/cloudyAnimation.json';

export const SingleWeatherCard = ({
  weatherData,
}: {
  weatherData: WeatherDataType;
}) => {
  const { city, country, temperature, feelsLike, description } = weatherData;

  let WeatherIcon;
  if (description.toLowerCase().includes('sunny')) {
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
      style={{
        width: '50%',
        margin: 'auto',
        marginTop: '20px',
        opacity: '.9',
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        style={{ width: '90%' }}
      >
        <CardHeader
          title={
            <Box display="flex" alignItems="center">
              {city}
            </Box>
          }
          subheader={country}
        />
        <Box>
          <Lottie options={defaultOptions} height={100} width={100} />
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
