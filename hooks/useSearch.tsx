import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, Keyboard } from 'react-native';
import { BlurView } from "expo-blur";
import { ScrollView,GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useLocation } from '@/hooks/useLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';

interface City {
  city : string;
  weatherData : any,
  handleSearch: (newCity: string) => Promise<void>;
  loading : boolean
}

export function useSearch() : City{
    const WEATHER_API_KEY = '693065354fb731c63bf96f434d2c8aee';
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const params = useLocalSearchParams();
    const [city, setCity] = useState(typeof params.city === "string"? params.city:"Tizi-Ouzou");
    
    useEffect(() => {
      const loadCity = async () => {
      if (typeof params.city === "string" && params.city !== city) {
        setCity(params.city);
      } else {
        try {
          const stored = await AsyncStorage.getItem('search-history');
          const history = stored ? JSON.parse(stored) : [];
          if (history.length > 0) {
            setCity(history[0]); // Use last searched city
          } else {
            setCity("Tizi-Ouzou"); // Fallback
          }
        } catch (e) {
          console.error("Error reading search-history:", e);
          //setCity("Tizi-Ouzou");
        }
      }
  };

  loadCity();
  }, [params.city]);

     useEffect(() => {
    if (city) fetchWeatherByCity(city);
    }, [city]);

    const handleSearch = async (newCity: string) => {
        setCity(newCity);
        router.replace(`/?city=${newCity}`); 
        await saveToHistory(newCity);
        Keyboard.dismiss();
    };

    const saveToHistory = async (city: string) => {
        try {
        const stored = await AsyncStorage.getItem('search-history');
        let history = stored ? JSON.parse(stored) : [];

        if (!history.includes(city)) {
            history.unshift(city);
            if (history.length > 10) history = history.slice(0, 10);
            await AsyncStorage.setItem('search-history', JSON.stringify(history));
        }
        } catch (e) {
        console.error('Erreur sauvegarde historique', e);
        }
    };
    const fetchWeatherByCity = async (cityName: string) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
      );
      setWeatherData(res.data);
    } catch (e) {
      console.error('Error fetching weather for city:', e);
    } finally {
      setLoading(false);
    }
  };

  return { city, handleSearch, weatherData, loading };
    //return {city,handleSearch}
}
