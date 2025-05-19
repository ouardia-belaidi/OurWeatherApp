import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { BlurView } from "expo-blur";
import { ScrollView,GestureHandlerRootView } from 'react-native-gesture-handler';
import weatherThemes from '../theme';
import WeatherCard  from "../../components/WeatherCard";
import WeeklyForecast from "../../components/WeeklyForecast";
import CurrentWeatherCard from "../../components/CurrentWeatherCard";
import axios from 'axios';
import DailyForcast from '@/components/DailyForecast';

export default function HomeScreen() {
  const [hourlyData, setHourlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [city, setCity] = useState("Tizi-Ouzou") // Default city
  const [currentData, setCurrentData] = useState<any>(null);
  const theme = weatherThemes.rainy; // later you can make it dynamic based on weather

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    const API_KEY = '693065354fb731c63bf96f434d2c8aee';
    const LAT = '36.7'; // example Tizi-Ouzou
    const LON = '4.05';
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
      );
      const list = response.data.list;

      const days = list.filter((item: any) => item.dt_txt.includes('12:00:00')).slice(0, 7); 
          const weekly = days.map((day: any) => ({
            date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
            temp: Math.round(day.main.temp),
            condition: day.weather[0].main,
            icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
          }));
          setWeeklyData(weekly);
      setHourlyData(response.data.list.slice(0, 15)); 

      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
      );
      setCurrentData(currentRes.data);

    } catch (error) {
      console.error(error);
    }
  };
 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ImageBackground source={theme.backgroundGif} style={styles.background} resizeMode="cover">
          <BlurView intensity={30} tint="light" style={styles.blurContainer}>
            <ScrollView>
              <View style={[styles.container, { backgroundColor: `${theme.colors.primary}90` }]}>

                <CurrentWeatherCard data = {currentData}/>
                
                <DailyForcast data={hourlyData}/>
                
                <WeeklyForecast data={weeklyData} />
              </View>
            </ScrollView>    
          </BlurView>
        </ImageBackground>
    </GestureHandlerRootView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    flex: 1,
  },
});
