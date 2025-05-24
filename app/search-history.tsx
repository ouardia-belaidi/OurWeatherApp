import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import { saveToHistory } from '@/utils/history';
import { Ionicons } from '@expo/vector-icons';

export default function SearchHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const router = useRouter();

  const fetchHistory = async () => {
    const stored = await AsyncStorage.getItem('search-history');
    if (stored) {
      setHistory(JSON.parse(stored));
    } else {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  //Recharger quand on revient sur l’écran
  useFocusEffect(
    React.useCallback(() => {
      fetchHistory();
    }, [])
  );

  const handleSearch = async (city: string) => {
    await saveToHistory(city);
    await fetchHistory();
    router.replace(`/?city=${city}`);
  };

  const handleSelect = async (city: string) => {
    await saveToHistory(city);
    await fetchHistory();
    router.replace(`/?city=${city}`);
  };
  const handleDeleteItem = async (indexToDelete: number) => {
    const updated = history.filter((_, index) => index !== indexToDelete);
    setHistory(updated);
    await AsyncStorage.removeItem('search-history');
  };

  const handleClearAll = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('search-history');
  };
  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch}/>
      {history.length === 0 ? (
        <Text style={styles.empty}>No recent searches</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item,index }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
              <Text>{item}</Text>
              <Ionicons name="close" size={20} color="gray" onPress={() => handleDeleteItem(index)}/>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
          history.length > 0 ? (
            <TouchableOpacity onPress={handleClearAll} style={styles.clearAllContainer}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
      ) : null
    }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold',   marginTop: 30,marginBottom: 20 },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', //ensures 2 items per row
  },
  empty: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
  clearAllContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  clearAllText: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: '70%',
  },
});
