import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToHistory = async (city: string) => {
  try {
    const stored = await AsyncStorage.getItem('search-history');
    let history = stored ? JSON.parse(stored) : [];

    if (!history.includes(city)) { 
      history.unshift(city);
      if (history.length > 10) history = history.slice(0, 10);
      await AsyncStorage.setItem('search-history', JSON.stringify(history));
    }
  } catch (e) {
    console.error('Erreur sauvegarde historique', e);
  }
};
