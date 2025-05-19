import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';

interface WeatherCardProps {
    time : any
    temperature: number;
    condition: string;
    icon: string;
}

export default function WeatherCard({ time,temperature,condition,icon }:WeatherCardProps){
    return(
        <View style ={styles.card}>
            <Text style={styles.time}>{time}</Text>
            <Image source={{ uri: icon }} style={styles.icon}/>
            <Text style={styles.temp}>{temperature}°C</Text>
            <Text style={styles.condition}>{condition}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card : {
        backgroundColor:"#ffffff",
        padding:12,
        borderRadius:10,
        shadowColor:"#000",
        shadowOffset:{ width:0, height: 2},
        shadowOpacity:0.3,
        shadowRadius: 4,
        elevation: 5,
        /*marginBottom:10,
        height:150,
        width:70,*/
        justifyContent : 'center',
        alignItems: "center",
        marginRight:10,
    },
    temp:{
        fontSize: 16,
        fontWeight: "medium",
    },
    condition:{
        fontSize: 14,
        color: "#555",
    },
    time:{
        fontSize: 14,
        color: "#555",
    },
    icon: {
        width: 40,
        height: 40,
        marginVertical: 5,
    },
});