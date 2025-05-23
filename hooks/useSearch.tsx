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
  handleSearch: (newCity: string) => Promise<void>;
}

export function useSearch() : City{
    //const [city,setCity] = useState([]);
      
    const params = useLocalSearchParams();
    const [city, setCity] = useState(typeof params.city === "string" ? params.city : "Tizi-Ouzou");
    
    useEffect(() => {
    if (typeof params.city === "string" && params.city !== city) {
      setCity(params.city);
    }
    }, [params.city]);

    const handleSearch = async (newCity: string) => {
        setCity(newCity);
        await saveToHistory(newCity);
        Keyboard.dismiss();
        router.replace(`/?city=${newCity}`); 
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
    return {city,handleSearch}
}
