import { Button, Grid, TextField } from '@mui/material';
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
    <div className="my-5">
      <form
        className="flex justify-center items-center"
        onSubmit={submitHandler}
      >
        <TextField
          id="outlined-basic"
          label="city"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button sx={{ py: 2 }} variant="contained" type="submit">
          search
        </Button>
      </form>
      {locationData ? <SingleWeatherCard weatherData={locationData} /> : ''}

      <Grid container spacing={2}>
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
    </div>
  );
};

export default Home;
