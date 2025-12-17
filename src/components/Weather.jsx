import { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle, CloudLightning, Wind, Droplets } from 'lucide-react';
import { getWeatherByCoords, getCurrentLocation } from '../services/weatherAPI';
import { getTranslation } from '../i18n/translations';

const Weather = ({ language }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // Update every 30 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const location = await getCurrentLocation();
      const weatherData = await getWeatherByCoords(location.lat, location.lon);
      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const iconProps = { size: 80, strokeWidth: 1.5 };
    
    switch (condition) {
      case 'clear':
        return <Sun {...iconProps} className="text-yellow-400" />;
      case 'clouds':
        return <Cloud {...iconProps} className="text-gray-400" />;
      case 'rain':
        return <CloudRain {...iconProps} className="text-blue-400" />;
      case 'drizzle':
        return <CloudDrizzle {...iconProps} className="text-blue-300" />;
      case 'thunderstorm':
        return <CloudLightning {...iconProps} className="text-purple-400" />;
      case 'snow':
        return <CloudSnow {...iconProps} className="text-blue-200" />;
      default:
        return <Cloud {...iconProps} className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-xl text-gray-600 dark:text-gray-300">
          {getTranslation(language, 'loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">{getTranslation(language, 'error')}</div>
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {getTranslation(language, 'retry')}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          {getWeatherIcon(weather.condition)}
        </div>
        <div className="text-6xl font-bold mb-2 text-gray-800 dark:text-white">
          {weather.temperature}°C
        </div>
        <div className="text-2xl text-gray-600 dark:text-gray-300 capitalize mb-2">
          {getTranslation(language, weather.condition)}
        </div>
        <div className="text-lg text-gray-500 dark:text-gray-400">
          {weather.city}, {weather.country}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="text-blue-400" size={24} />
            <span className="text-gray-600 dark:text-gray-300">
              {getTranslation(language, 'humidity')}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {weather.humidity}%
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="text-green-400" size={24} />
            <span className="text-gray-600 dark:text-gray-300">
              {getTranslation(language, 'windSpeed')}
            </span>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white">
            {weather.windSpeed} km/h
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;