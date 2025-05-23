import { Stack } from "expo-router";
import {LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return(
    <Stack>
      <Stack.Screen name ="(tabs)" options={{ headerShown:false }}/> 
      <Stack.Screen name ="search-history" options={{ headerShown:false}}/> 
      <Stack.Screen name ="about" options={{ title:'About us'}}/> 
      <Stack.Screen name ="details" options={{ headerShown:true , title:'Weather Details'}}/>  
      <Stack.Screen name ="not-found" options = {{ title: "Oups! Not Found" }}/>
    </Stack> 
  );
}