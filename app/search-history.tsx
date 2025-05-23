import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import { saveToHistory } from '@/utils/history';

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

  // Recharger quand on revient sur l’écran
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

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <Text style={styles.title}>Historique des recherches</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>Aucune recherche récente.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold',   marginTop: 30,marginBottom: 20 },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  empty: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});
