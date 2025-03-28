import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData } from '../services/weatherService';
import { WeatherState } from '../types/WeatherState';

const initialState: WeatherState = {
  weather: null,
  loading: false,
  error: null,
  unit: 'metric',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.loading = false;
      state.weather = action.payload;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
  },
});

export const {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  toggleUnit,
} = weatherSlice.actions;

export default weatherSlice.reducer;
