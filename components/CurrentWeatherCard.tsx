import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';


interface CurrentWeatherProps {
  data: any;
}


export default function CurrentWeatherCard( {data} :CurrentWeatherProps){
    if (!data) return null;
    return(
        <View style={styles.card}>
                <Text style={styles.city}>{data.name}</Text>
                <Image
                    source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }}
                    style={styles.icon}
                 />

                <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
                <Text style={styles.condition}>{data.weather[0].main}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    alignItems: 'center',
    padding : 10,
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
});