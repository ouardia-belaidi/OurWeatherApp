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
import { useLocation } from '@/hooks/useLocation';
import { useFetchWeather } from '@/hooks/useFetchWeather';

export default function HomeScreen() {
  const location = useLocation();
  console.log("Location : ",location)
  const [city, setCity] = useState("Tizi-Ouzou") // Default city
  const theme = weatherThemes.cloudy; // later you can make it dynamic based on weather
  const { currentData,hourlyData,weeklyData } = useFetchWeather(location.latitude,location.longitude);
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1}}>
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
