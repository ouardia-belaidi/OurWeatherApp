import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type SearchBarProps = {
  onSearch: (city: string) => void;
  onFocus?: () => void;
};

const SearchBar = ({ onSearch, onFocus }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="#555" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Rechercher une ville"
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSubmit}
        onFocus={onFocus} // 👈 Appelle la navigation vers SearchHistoryScreen
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
