import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import { FlatList,GestureHandlerRootView } from 'react-native-gesture-handler';

interface ForecastItem {
    date: string;
    temp: number;
    condition: string;
    icon: string;
  }
  
interface WeeklyForecastProps {
    data: ForecastItem[];
  }
  
  export default function WeeklyForecast({ data }: WeeklyForecastProps) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>7 Days Forecast</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.date}>{item.date}</Text>
              <Image source={{ uri: item.icon }} style={styles.icon} />
              <Text style={styles.temp}>{item.temp}°C</Text>
              <Text style={styles.condition}>{item.condition}</Text>
            </View>
          )}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { width: "100%", marginTop: 20, borderRadius: 16, borderColor: "#ffff", padding:5, },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color:"#fff", },
    item: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, backgroundColor: "#ffffff", borderRadius: 10, margin:10, },
    date: { color: "#555", fontSize: 16 },
    icon: { width: 40, height: 40 },
    temp: {  color: "#555", fontSize: 16 },
    condition: {  color: "#555", fontSize: 14 },
  });