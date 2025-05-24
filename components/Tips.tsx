import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView,Linking } from 'react-native';
import TipCard from './TipCard';
import { WeatherTip } from '../utils/getTips';

type Tip = {
  icon: string;
  label: string;
  url?: string;
};

type TipsProps = {
  tips: Tip[];
};

const Tips: React.FC<TipsProps> = ({ tips }) => {
  const handleTipPress = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("Erreur lors de l'ouverture du lien :", err));
    }
  };

  return (
    <View style = {styles.container}>
      <Text style={[styles.title]}>Lifestyle Tips</Text>
      
      <View style={styles.grid}>
        {tips.map((tip, index) => (
          <TipCard 
            key={index}
            icon={tip.icon}
            label={tip.label}
            onPress={() => handleTipPress(tip.url)}
          />
        ))}
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // ensures 2 items per row
    padding:15,
  },
});

export default Tips;
