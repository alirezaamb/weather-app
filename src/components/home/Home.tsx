import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { getWeatherData } from '../../api/get/get';
import { WeatherCard } from './weather-card-full-size/WeatherCardFullSize';
import { WeatherDataType } from '../../types/type';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { SingleWeatherCard } from './single-weather-card/SingleWeatherCardFullSize';

const Home = () => {
  const [search, setSearch] = useState('');
  const [locationData, setLocationData] = useState<WeatherDataType | null>(
    null
  );
  const [toastState, setToastState] = useState({
    isOpen: false,
    message: 'Please enter a valid city name',
  });
  const [recentSearches, setRecentSearches] = useState<WeatherDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const previousData: WeatherDataType[] =
      getLocalStorage('recentSearch') || [];
    setRecentSearches(previousData);
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search.trim()) {
      setToastState({ isOpen: true, message: 'City name cannot be empty' });
      return;
    }

    setIsLoading(true);
    try {
      const weatherData = await getWeatherData(search);

      if (weatherData.status !== 200) {
        setToastState({
          isOpen: true,
          message: 'Please enter a valid city name',
        });
      } else {
        const data = {
          city: weatherData.data.resolvedAddress.split(',')[0],
          country: weatherData.data.resolvedAddress.split(',')[1],
          temperature: weatherData.data.days[0].temp,
          feelsLike: weatherData.data.days[0].feelslike,
          description: weatherData.data.days[0].description,
        };

        const isDuplicate = recentSearches.some(
          (item) => item.city === data.city
        );

        if (!isDuplicate) {
          const updatedData = [...recentSearches, data];
          setLocationData(data);
          setRecentSearches(updatedData);
          setLocalStorage('recentSearch', JSON.stringify(updatedData));
        } else {
          setLocationData(data);
        }
      }
    } catch (error) {
      setToastState({
        isOpen: true,
        message: 'Something went wrong,Try again!',
      });
    } finally {
      setIsLoading(false);
      setSearch('');
    }
  };

  const handleClose = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            pt: '15px',
            flexDirection: { xs: 'column', sm: 'row' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            value={search}
            label="City"
            variant="filled"
            autoComplete="on"
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              backgroundColor: 'white',
              opacity: 0.9,
              borderRadius: { xs: '5px 5px 0 0', sm: '5px 0 0 5px' },
              mb: { xs: 1, sm: 0 },
              width: { xs: '100%', sm: 'auto' },
            }}
          />
          <Button
            sx={{
              py: 2,
              borderRadius: { xs: '0 0 5px 5px', sm: '0 5px 5px 0' },
              width: { xs: '100%', sm: 'auto' },
            }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, mt: 3 }}>
        <Box>
          {locationData && <SingleWeatherCard weatherData={locationData} />}
        </Box>

        <Box>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: { xs: '24px', sm: '30px' },
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Recent
          </Typography>
          <Grid container spacing={2} sx={{ overflowY: 'auto' }}>
            {recentSearches.map((recent, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <WeatherCard weatherData={recent} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Snackbar
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={toastState.isOpen}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toastState.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Home;
