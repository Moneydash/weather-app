import React, { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston']; // Example cities

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const responses = await Promise.all(
          cities.map(city =>
            // add env file for your weather api key
            // you can use the .env.example as the sample env file for your environment.
            fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&aqi=no`)
          )
        );
        const data = await Promise.all(responses.map(res => res.json()));
        console.log(data);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    // Set language from localStorage
    const savedLanguage = localStorage.getItem('lang');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [])

  const handleSearch = (query: string) => {
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="home">
        <LanguageSwitcher />
        <SearchBar onSearch={handleSearch} />
        <h1>{t('todaysForecast')}</h1>
        <div>
          {weatherData.map((weather, index) => (
            <WeatherCard 
              key={index}
              country={weather.location.country} 
              location={weather.location.name} 
              temperature={Math.round(weather.current.temp_c)} 
              condition={weather.current.condition.text} 
              icon={weather.current.condition.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
