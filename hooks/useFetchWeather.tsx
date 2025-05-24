import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
 

interface WeatherData {
  currentData: any;
  hourlyData: any[];
  weeklyData: any[];
}

export function useFetchWeather(latitude : number | null,longitude:number | null, city : string) :WeatherData {
    const [hourlyData, setHourlyData] = useState([]);
    const [weeklyData, setWeeklyData] = useState<any[]>([]);
    const [currentData, setCurrentData] = useState<any>(null);
    //const city = "Malmo"
    const API_KEY = '693065354fb731c63bf96f434d2c8aee';
    
    useEffect(() => {
        if (latitude && longitude) {
            fetchWeatherByLocation(latitude, longitude);
        }
        else{
            fetchWeatherBycity(city);
        }
    }, [latitude, longitude]);

    const fetchWeatherByLocation = async (LAT: number, LON: number) => {
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
                icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
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

    const fetchWeatherBycity = async(city:string) => {
        try {
            const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
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
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            );
            setCurrentData(currentRes.data);

        } catch (error) {
            Alert.alert(
                'Invalid City',
                `No weather data found for "${city}". Please check the spelling and try again.`,
            [{ text: 'OK', onPress : () => router.push('/search-history')}]
            );
        }
    }
    return {currentData,hourlyData,weeklyData}
}