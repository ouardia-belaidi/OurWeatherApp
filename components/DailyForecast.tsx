import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import WeatherCard from './WeatherCard';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

interface DailyForecastProps {
  data: any[]; 
}

export default function DailyForcast({ data }: DailyForecastProps){
    return(
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={ styles.container}>
                    {data.map((hour: any, index: number) => (
                      <WeatherCard
                        key={index}
                        time={new Date(hour.dt * 1000).getHours() + ":00"}
                        temperature={Math.round(hour.main.temp)}
                        condition={hour.weather[0].main}
                        icon={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                      />
                    ))}
        </ScrollView>
    );
   
  
}

const styles = StyleSheet.create({
    container: {
      borderColor:"#555",
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
  });