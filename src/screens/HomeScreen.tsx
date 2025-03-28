import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    ScrollView,
    PermissionsAndroid,
    Platform
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWeatherStart,
    fetchWeatherSuccess,
    fetchWeatherFailure,
    toggleUnit
} from '../redux/weatherSlice';
import { setTheme } from '../redux/themeSlice';
import { addSearchHistory } from '../redux/searchHistorySlice';
import { getCoordsByCity, getWeatherByCoords } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import SunTiming from '../components/SunTiming';
import WeatherWind from '../components/WeatherWind';
import WeatherFeel from '../components/WeatherFeel';
import DarkThemeSvg from '../assets/SVGS/DarkThemeSvg';
import LightThemeSvg from '../assets/SVGS/LightThemeSvg';
import SearchIcon from '../assets/SVGS/SearchIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createStyles from '../styles/HomeScreenStyles';
import Forecast from '../components/Forecast';

const HomeScreen = () => {
    // Local state for input field, search label, and loading control
    const [city, setCity] = useState('');
    const [searchedCity, setSearchedCity] = useState('');
    const [searching, setSearching] = useState(false);

    // Access redux store and dispatch
    const dispatch = useDispatch();
    const { weather, loading, error, unit } = useSelector((state: any) => state.weather);
    const { darkMode } = useSelector((state: any) => state.theme);
    const styles = createStyles(darkMode);

    // Effect to fetch weather based on last searched or current location
    useEffect(() => {
        (async () => {
            const storedCity = await AsyncStorage.getItem('lastCity');
            if (storedCity) {
                fetchWeatherByCityName(storedCity);
            } else {
                fetchWeatherByCurrentLocation();
            }
        })();
    }, [unit]);

    /**
     * Fetches weather data based on city name
     * @param cityName Name of the city to fetch weather for
     */
    const fetchWeatherByCityName = async (cityName: string) => {
        try {
            setSearching(true);
            dispatch(fetchWeatherStart());

            // Get coordinates and weather for city
            const coords = await getCoordsByCity(cityName);
            const weatherData = await getWeatherByCoords(coords.lat, coords.lon, unit);

            dispatch(fetchWeatherSuccess(weatherData));
            dispatch(addSearchHistory({ city: cityName, weather: weatherData }));
            setSearchedCity(cityName);
            await AsyncStorage.setItem('lastCity', cityName);
        } catch (err: any) {
            dispatch(fetchWeatherFailure(err.message));
        } finally {
            setSearching(false);
        }
    };

    /**
     * Fetches weather data using device's current geolocation
     */
    const fetchWeatherByCurrentLocation = async () => {
        try {
            setSearching(true);
            dispatch(fetchWeatherStart());

            // Request location permission on Android
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    throw new Error('Location permission denied');
                }
            }

            // Get current location and fetch weather data
            Geolocation.getCurrentPosition(
                async position => {
                    const { latitude, longitude } = position.coords;
                    const weatherData = await getWeatherByCoords(latitude, longitude, unit);

                    dispatch(fetchWeatherSuccess(weatherData));
                    setSearchedCity('Current Location'); // Can enhance this using reverse geocoding
                },
                error => {
                    dispatch(fetchWeatherFailure(error.message));
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (err: any) {
            dispatch(fetchWeatherFailure(err.message));
        } finally {
            setSearching(false);
        }
    };

    /**
     * Determines how to fetch weather:
     * - If user has typed a city, search by city
     * - Otherwise, use geolocation
     */
    const handleFetchWeather = () => {
        const trimmedCity = city.trim();
        if (trimmedCity) {
            fetchWeatherByCityName(trimmedCity);
        } else {
            fetchWeatherByCurrentLocation();
        }
    };

    return (
        <View style={styles.container}>
            {/* Top bar with unit toggle and theme switch */}
            <View style={styles.topBar}>
                <View style={styles.topBarRight}>
                    <TouchableOpacity onPress={() => dispatch(toggleUnit())} style={styles.unitToggle}>
                        <Text style={styles.unitToggleText}>
                            {unit === 'metric' ? '°C' : '°F'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => dispatch(setTheme(!darkMode))}>
                        {darkMode ? (
                            <DarkThemeSvg height={30} width={30} />
                        ) : (
                            <LightThemeSvg height={30} width={30} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search bar input */}
            <View style={styles.searchBarContainer}>
                <View style={[styles.searchBar, darkMode && styles.darkInput]}>
                    <SearchIcon height={24} width={24} />
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="Search your place"
                        placeholderTextColor={darkMode ? '#ccc' : '#555'}
                        returnKeyType="search"
                        onSubmitEditing={handleFetchWeather}
                    />
                    <TouchableOpacity
                        onPress={handleFetchWeather}
                        disabled={!city.trim() && !searching}
                        style={[styles.searchButton, darkMode && styles.darkButton]}
                    >
                        <Text style={[styles.searchButtonText, darkMode && styles.darkButtonText]}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Loading indicator */}
            {loading && (
                <ActivityIndicator
                    size="large"
                    color={darkMode ? '#fff' : '#000'}
                    style={styles.loadingIndicator}
                />
            )}

            {/* Error message */}
            {error && !loading && <Text style={styles.error}>{error}</Text>}

            {/* Weather information view */}
            {weather && !loading && !error && (
                <ScrollView style={styles.weatherDetails} showsVerticalScrollIndicator={false}>
                    <WeatherCard weather={weather} searchedCity={searchedCity} />
                    <SunTiming weather={weather} />
                    <WeatherWind weather={weather} />
                    <WeatherFeel weather={weather} />
                    <Forecast weather={weather} />
                </ScrollView>
            )}
        </View>
    );
};

export default HomeScreen;
