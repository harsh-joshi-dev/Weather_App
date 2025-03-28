export interface WeatherState {
    weather: any;
    loading: boolean;
    error: string | null;
    unit: 'metric' | 'imperial';
  }
  