import React, { useEffect, useState } from 'react';
import { 
  View, Text, Linking, StyleSheet, ScrollView,
} from 'react-native';
import weatherThemes from './themes/theme2';
 

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OurWeatherApp! Your favorite Weather Forecast app</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container : {
    marginTop: 20,
    padding : 14,
  },
  text: {
    fontSize : 20,
    color: "#000",
  },
});