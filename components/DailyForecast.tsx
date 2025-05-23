import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import WeatherCard from './WeatherCard';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

interface DailyForecastProps {
  data: any[]; 
}

export default function DailyForcast({ data }: DailyForecastProps){
    return(
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
      </View>
        
    );
}

const styles = StyleSheet.create({
  container: {
    margin : 10,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    height: 170, // Adjust this based on card height
  },
  scrollContent: {
    alignItems: 'center',
    gap: 12, // space between cards
  },
});