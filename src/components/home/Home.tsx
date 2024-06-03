import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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
  const [recentSearchs, setRecentSearchs] = useState<WeatherDataType[] | null>(
    null
  );

  useEffect(() => {
    const previousData = getLocalStorage('recentSearch');

    setRecentSearchs(previousData);
  }, []);
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (search !== '') {
      const weatherData = await getWeatherData(search);
      const data = {
        city: weatherData.data.resolvedAddress.split(',')[0],
        country: weatherData.data.resolvedAddress.split(',')[1],
        temperature: weatherData.data.days[0].temp,
        feelsLike: weatherData.data.days[0].feelslike,
        description: weatherData.data.days[0].description,
      };
      const isDuplicate = recentSearchs?.some(
        (item) => item.city === data.city
      );

      if (!isDuplicate) {
        setLocationData(data);
        const updatedData = [...(recentSearchs || []), data];
        setLocalStorage('recentSearch', JSON.stringify(updatedData));
        setRecentSearchs(updatedData);
      } else {
        setLocationData(data);
      }
    }
  };
  return (
    <div className="">
      <Box
        component={'form'}
        className="flex justify-center items-center"
        onSubmit={submitHandler}
        sx={{ pt: '15px' }}
      >
        <TextField
          id="outlined-basic"
          label="city"
          variant="filled"
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: 'white',
            opacity: 0.9,
            borderRadius: '5px 0px 0px 5px',
            outline: 'none',
          }}
        />
        <Button
          sx={{ py: 2, borderRadius: '0px 5px 5px 0px' }}
          variant="contained"
          type="submit"
        >
          search
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Box>
          {locationData ? <SingleWeatherCard weatherData={locationData} /> : ''}
        </Box>

        <Box>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '30px',
              fontWeight: 'bold',
            }}
          >
            Recent
          </Typography>
          <Grid container spacing={2} sx={{ pb: 2 }}>
            {recentSearchs
              ? recentSearchs?.map((recent, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={3}>
                      <WeatherCard weatherData={recent} />
                    </Grid>
                  );
                })
              : ''}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
