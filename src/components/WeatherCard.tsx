// src/components/WeatherCard.tsx
import React from 'react';

interface WeatherCardProps {
  country: string;
  location: string;
  temperature: number;
  condition: string;
  icon: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ country, location, temperature, condition, icon }) => {
  return (
    <div className="weather-card">
      <h2>{country}</h2>
      <h3>{location}</h3>
      <img src={icon} alt={condition} className="weather-icon" />
      <p>{temperature}°C</p>
      <p>{condition}</p>
    </div>
  );
};

export default WeatherCard;