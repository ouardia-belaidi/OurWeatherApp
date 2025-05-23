import React,{useEffect, useState} from 'react';
import {  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,View, Text, StyleSheet,Linking } from 'react-native';
import * as Location from 'expo-location';
import { router } from 'expo-router';


interface locationCoordinates {
    latitude : number | null,
    longitude : number | null,
}

export function useLocation() : locationCoordinates {
    const [location,setLocation] = useState<locationCoordinates>({
        latitude : null,
        longitude : null,
    });

    const requestLocationPermission = async() =>{
        const openAppSettings = () => {
              Linking.openSettings(); //android
            };
        try{
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            Alert.alert(
                'Permission Denied',
                'We need location permission to show more accurate weather info. Please enable it in Settings or search manuallly.',
                [ 
                    { text: 'Open Settings', onPress: openAppSettings },
                    { text: 'Search Manually', onPress: () => router.push('/search-history') },
                    { text: 'Cancel', style: 'cancel'},
                    ]
                );
            return;
            }
            else{
                const loc = await Location.getCurrentPositionAsync({});
                const {latitude , longitude } = loc.coords;
                setLocation({latitude,longitude});
            }
        }
        catch (error){
            console.error("Error while asking for location:",error);
        }
    };

    useEffect(() => {
            requestLocationPermission();
      }, []);
    //console.log("Location : ",location)
    return location;
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '50%',
    borderColor: '#888',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 50,
    paddingVertical: 10,
  },
});



