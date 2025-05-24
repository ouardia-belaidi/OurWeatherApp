import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, Keyboard } from 'react-native';
import { BlurView } from "expo-blur";
import { ScrollView,GestureHandlerRootView } from 'react-native-gesture-handler';
import { getTheme } from '../themes/theme';
import WeeklyForecast from "../../components/WeeklyForecast";
import CurrentWeatherCard from "../../components/CurrentWeatherCard";
import Tips from '@/components/Tips';
import DailyForcast from '@/components/DailyForecast';
import { useLocation } from '@/hooks/useLocation';
import { useFetchWeather } from '@/hooks/useFetchWeather';
import { getWeatherTips } from '@/utils/getTips';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import { useSearch } from '@/hooks/useSearch';
import { ActivityIndicator } from 'react-native';


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
  const isLoading = !currentData || !hourlyData.length || !weeklyData.length;

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
               {isLoading ? (
                  <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', marginTop: 10 }}>Loading weather...</Text>
                  </View>
                ) : (
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
              </View>)}
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
  loaderContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 50,
},
});
