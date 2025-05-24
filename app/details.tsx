import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Details() {
  const { data } = useLocalSearchParams();
  const weather = data ? JSON.parse(data as string) : null;
  if (!weather) return <Text style={styles.header}>No weather data available</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{padding : 10,}}>
          <Text style={styles.header}>{weather.name}</Text>
      </View>

      {/* Temperature Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌡️ Temperature</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Current</Text>
            <Text style={styles.value}>{Math.round(weather.main.temp)}°C</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Feels Like</Text>
            <Text style={styles.value}>{Math.round(weather.main.feels_like)}°C</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Max</Text>
            <Text style={styles.value}>{Math.round(weather.main.temp_max)}°C</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Min</Text>
            <Text style={styles.value}>{Math.round(weather.main.temp_min)}°C</Text>
          </View>
        </View>
      </View>

      {/* Weather Condition */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌤️ Condition</Text>
        <Text style={styles.value}>{weather.weather[0].main}</Text>
        <Text style={styles.label}>{weather.weather[0].description}</Text>
      </View>

      {/* Wind and Pressure */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌬️ Wind & Pressure</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Speed</Text>
            <Text style={styles.value}>{Math.round(weather.wind.speed)} km/h</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Pressure</Text>
            <Text style={styles.value}>{weather.main.pressure} hPa</Text>
          </View>
        </View>
      </View>

      {/* Humidity */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💧 Humidity</Text>
        <Text style={styles.value}>{weather.main.humidity}%</Text>
      </View>

      {/* Precipitation */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌧️ Precipitation</Text>
        <Text style={styles.value}>
          {weather.rain?.['1h']
            ? `${weather.rain['1h']} mm (last hour)`
            : weather.rain?.['3h']
            ? `${weather.rain['3h']} mm (last 3h)`
            : 'N/A'}
        </Text>
      </View>

      {/* Sun Times */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>☀️ Sunrise & Sunset</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Sunrise</Text>
            <Text style={styles.value}>
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Sunset</Text>
            <Text style={styles.value}>
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eaf1f8',
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#777',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
