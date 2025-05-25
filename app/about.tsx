import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={require('../assets/logo/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Our Weather App </Text>
      <Text style={styles.version}>Version : 1.0.0</Text>

      {/* Bloc Contact Us */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowEmail(!showEmail)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Contact Us</Text>
            <Text style={styles.buttonText}><Ionicons 
              name={showEmail ? "chevron-down" : "chevron-up"} 
              size={24} 
              color="black" 
            /></Text>
          </View>
        </TouchableOpacity>
      </View>

      {showEmail && (
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>📧 WeatherApp@gmail.com</Text>
        </View>
      )}

      {/* Bloc Features */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowFeatures(!showFeatures)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Features</Text>
            <Text style={styles.buttonText}><Ionicons 
              name={showFeatures ? "chevron-down" : "chevron-up"} 
              size={24} 
              color="black" 
            /></Text>
          </View>
        </TouchableOpacity>
      </View>

      {showFeatures && (
        <View style={styles.featuresContainer}>
          <Text style={styles.featureItem}>- Fetch weather by city or current location (with permissions)</Text>
          <Text style={styles.featureItem}>- 5-days and hourly weather forecast</Text>
          <Text style={styles.featureItem}>- Realtime weather details</Text>
          <Text style={styles.featureItem}>- Dynamic UI themes based on weather condition and time of day</Text>
          <Text style={styles.featureItem}>- Lifestyle tips based on forecast</Text>
          <Text style={styles.featureItem}>- Search for cities and store search history</Text>
        </View>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  version: {
    fontSize: 14,
    color: '#444',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  button: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    color: '#444',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuresContainer: {
    marginTop:10,
    width: '95%',
    paddingHorizontal: 10,
  },
  featureItem: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 4,
  },
  emailContainer: {
    marginTop: 20,
    //backgroundColor: '#eef',
    padding: 10,
    borderRadius: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#003366',
  },
});

export default AboutScreen;
