// src/pages/SearchResults.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const SearchResults: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Function to get query parameters
  const getQueryParams = (search: string) => {
    const params = new URLSearchParams(search);
    return params.get('query');
  };

  useEffect(() => {
    // Set language from localStorage
    const savedLanguage = localStorage.getItem('lang');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }

    const query = getQueryParams(location.search);
    
    if (query) {
      const fetchWeatherData = async () => {
        setLoading(true);
        setError(null);
        try {
          // add env file for your weather api key
          const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}&aqi=no`);
          const data = await response.json();
          setWeatherData([data]); // Wrap in an array to match the existing structure
        } catch (err) {
          setError('Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [location.search, i18n]); // Add i18n to dependencies

  const handleBackToHome = () => {
    navigate("/");
  };

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}</div>;

  return (
    <>
      <div className="search-results">
        <LanguageSwitcher />
        <h1>{t('searchResults')}</h1>
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
      <button onClick={handleBackToHome} className="home-button">{t("backToHome")}</button>
    </>
  );
};

export default SearchResults;