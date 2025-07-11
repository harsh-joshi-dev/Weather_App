import { CityCoords } from '../types/CityCoords';

export interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    wind_speed: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  daily: Array<{
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
  hourly: Array<{
    dt: number;
    temp: number;
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

export const getCoordsByCity = async (city: string): Promise<CityCoords> => {
  const API_KEY = process.env.REACT_NATIVE_OPENCAGE_API_KEY;
  const query = encodeURIComponent(city);

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${API_KEY}&language=en`,
  );

  const data = await response.json();

  if (
    data.results.length === 0 ||
    !data.results[0].formatted.toLowerCase().includes(city.toLowerCase())
  ) {
    throw new Error('City not found or invalid city');
  }

  const best = data.results[0];

  return {
    lat: best.geometry.lat,
    lon: best.geometry.lng,
    name: best.formatted,
  };
};

export const getWeatherByCoords = async (
  lat: number,
  lon: number,
  unit: 'metric' | 'imperial' = 'metric'
): Promise<WeatherData> => {
  const API_KEY = process.env.REACT_NATIVE_OPENWEATHER_API_KEY;
  const exclude = 'minutely';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${unit}&appid=${API_KEY}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};
