import { router } from 'expo-router';
import React from 'react';
import { View, Text,StyleSheet,Image, Touchable, TouchableOpacity } from 'react-native';


interface CurrentWeatherProps {
  data: any;
}


export default function CurrentWeatherCard( {data} :CurrentWeatherProps){
    if (!data) return null;
const handlePress = (item: CurrentWeatherProps) => {
  router.push({
    pathname: '../details',
    params: {
      data: JSON.stringify(data),
    },
  });
  }
    return(
        <TouchableOpacity style={styles.card} onPress={() => handlePress(data)}>
                <Text style={styles.city}>{data.name}</Text>
                <Image
                    source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }}
                    style={styles.icon}
                 />

                <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
                <Text style={styles.condition}>{data.weather[0].main}</Text>
                <Text style={styles.details}>Max : {data.main.temp_max !== null ? `${Math.round(data.main.temp_max)}°` : "--"}    Min : {data.main.temp_min !== null ? `${Math.round(data.main.temp_min)}°` : "--"}</Text>
                <Text style={styles.wind}>Wind : {data.wind.speed !== null ? `${Math.round(data.wind.speed)} Km/h` : "--"}</Text>  
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    alignItems: 'center',
    padding : 12,
    backgroundColor: '#ffffff30',
    borderRadius: 20,
    marginTop : 16,
    marginBottom: 16,
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  condition: {
    fontSize: 18,
    color: '#eee',
  },
  details: {
    fontSize: 16,
    marginTop: 12,
    color: '#eee',
  },
  wind: {
    fontSize: 16,
    marginTop: 2,
    color: '#eee',
  },
});