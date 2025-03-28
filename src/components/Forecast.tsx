import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { WeatherCardProps } from '../types/WeatherTypes';

type ForecastProps = {
    weather: WeatherCardProps['weather'];
};

const Forecast: React.FC<ForecastProps> = ({ weather }) => {
    const { darkMode } = useAppSelector(state => state.theme);
    const { unit } = useAppSelector(state => state.weather);

    const styles = createStyles(darkMode);
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>5-Day Forecast</Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={weather.daily.slice(1, 6)} // skip today
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    const date = new Date(item.dt * 1000);
                    const day = date.toLocaleDateString(undefined, { weekday: 'short' });

                    return (
                        <View style={styles.card}>
                            <Text style={styles.day}>{day}</Text>
                            <Image
                                source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                                style={styles.icon}
                            />
                            <Text style={styles.temp}>
                                {item.temp.day.toFixed(0)}{unitSymbol}
                            </Text>
                            <Text style={styles.condition}>{item.weather[0].main}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const createStyles = (dark: boolean) =>
    StyleSheet.create({
        container: {
            paddingVertical: 16,
            marginTop: 10,
        },
        heading: {
            fontSize: 18,
            fontWeight: '600',
            color: dark ? '#fff' : '#000',
            marginLeft: 12,
            marginBottom: 10,
        },
        card: {
            backgroundColor: dark ? '#1e1e1e' : '#fff',
            borderRadius: 10,
            padding: 12,
            alignItems: 'center',
            marginHorizontal: 6,
            width: 100,
        },
        day: {
            fontSize: 14,
            fontWeight: '500',
            color: dark ? '#fff' : '#000',
            marginBottom: 6,
        },
        icon: {
            width: 45,
            height: 45,
        },
        temp: {
            fontSize: 16,
            fontWeight: '600',
            color: dark ? '#fff' : '#000',
            marginTop: 6,
        },
        condition: {
            fontSize: 12,
            color: dark ? '#ccc' : '#333',
            marginTop: 2,
        },
    });

export default Forecast;
