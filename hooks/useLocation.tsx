import React,{useEffect, useState} from 'react';
import {  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,View, Text, StyleSheet,Linking } from 'react-native';
import * as Location from 'expo-location';


interface locationCoordinates {
    latitude : number | null,
    longitude : number | null,
}

export function useLocation() : locationCoordinates {
    const [location,setLocation] = useState<locationCoordinates>({
        latitude : null,
        longitude : null,
    });

    //const [permissionGranted,setPermissionGranted] = useState<boolean|null>(null);

    const requestLocationPermission = async() =>{
        const openAppSettings = () => {
               // if (Platform.OS === 'ios') {
                  //  Linking.openURL('app-settings:');
               // } else {
                    Linking.openSettings(); // Android
               // }
            };
        try{
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            Alert.alert(
                'Permission Denied',
                'We need location permission to show weather info. Please enable it in Settings.',
                [
                    { text: 'Open Settings', onPress: openAppSettings },
                    { text: 'Cancel', style: 'cancel' },
                    ]
                );
            return;
            }
            
            const loc = await Location.getCurrentPositionAsync({});
            const {latitude , longitude } = loc.coords;
            setLocation({latitude,longitude});
    
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



