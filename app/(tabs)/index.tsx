import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, Keyboard } from 'react-native';
import { BlurView } from "expo-blur";
import { ScrollView,GestureHandlerRootView } from 'react-native-gesture-handler';
import weatherThemes from '../themes/theme2';
import { getTheme } from '../themes/theme';
import WeatherCard  from "../../components/WeatherCard";
import WeeklyForecast from "../../components/WeeklyForecast";
import CurrentWeatherCard from "../../components/CurrentWeatherCard";
import Tips from '@/components/Tips';
import axios from 'axios';
import DailyForcast from '@/components/DailyForecast';
import { useLocation } from '@/hooks/useLocation';
import { useFetchWeather } from '@/hooks/useFetchWeather';
import { getWeatherTips } from '@/utils/getTips';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchHistory from '../search-history';
import { useSearch } from '@/hooks/useSearch';

export default function HomeScreen() {
  const location = useLocation();
  console.log("Location : ",location);
  const router = useRouter();
  const params = useLocalSearchParams();
  const {city,handleSearch} = useSearch();
  const { currentData,hourlyData,weeklyData } = useFetchWeather(location.latitude,location.longitude,city);
  const sunriseUTC = currentData?.sys?.sunrise;
  const sunsetUTC = currentData?.sys?.sunset;
  const currentCondition = currentData?.weather[0]?.main;
  console.log("Condition : ",currentCondition )
  const currentTime = Math.floor(Date.now() / 1000);
  const tipsData = getWeatherTips(currentCondition ?? 'default');
  const theme = getTheme(currentCondition ?? 'default', currentTime,sunriseUTC,sunsetUTC);
  //console.log(theme)
  //console.log(new Date(currentTime * 1000).getHours())
  //console.log("Sunrise:", new Date(sunriseUTC * 1000).toLocaleTimeString());
  //console.log("Sunset:", new Date(sunsetUTC * 1000).toLocaleTimeString());
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1}}>
        <ImageBackground source={theme.backgroundGif} style={styles.background} resizeMode="cover">
          <BlurView intensity={30} tint="light" style={styles.blurContainer}>
            <ScrollView>
              <View style={[styles.container, { backgroundColor: `${theme.colors.textMain}90` }]}>
                {/* Barre de recherche */}
                <SearchBar 
                  onSearch={handleSearch} 
                  onFocus={() => router.push('/search-history')} 
                />

                <CurrentWeatherCard data = {currentData}/>
                
                <DailyForcast data={hourlyData}/>
                
                <WeeklyForecast data={weeklyData} />

                <Tips tips={tipsData} />
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
   subtitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 5,
  },
});
