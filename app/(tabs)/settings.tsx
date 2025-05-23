import React, { useEffect, useState } from 'react';
import { 
  View, Text, Switch, TouchableOpacity, Linking, StyleSheet, ScrollView, Modal, Pressable 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const LANGUAGES = ['Français', 'Anglais'];

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [unitInCelsius, setUnitInCelsius] = useState(true);
  const [showAirQuality, setShowAirQuality] = useState(true);
  const [use24Hour, setUse24Hour] = useState(true);
  const [language, setLanguage] = useState('Français');
  const [modalVisible, setModalVisible] = useState(false);

  // Chargement des prefs au démarrage
  useEffect(() => {
    (async () => {
      try {
        const notif = await AsyncStorage.getItem('notificationsEnabled');
        const unit = await AsyncStorage.getItem('unitInCelsius');
        const air = await AsyncStorage.getItem('showAirQuality');
        const hour = await AsyncStorage.getItem('use24Hour');
        const lang = await AsyncStorage.getItem('language');

        if (notif !== null) setNotificationsEnabled(notif === 'true');
        if (unit !== null) setUnitInCelsius(unit === 'true');
        if (air !== null) setShowAirQuality(air === 'true');
        if (hour !== null) setUse24Hour(hour === 'true');
        if (lang !== null) setLanguage(lang);
      } catch (e) {
        console.log('Erreur chargement préférences', e);
      }
    })();
  }, []);

  // Sauvegarder chaque changement dans AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
  }, [notificationsEnabled]);

  useEffect(() => {
    AsyncStorage.setItem('unitInCelsius', unitInCelsius.toString());
  }, [unitInCelsius]);

  useEffect(() => {
    AsyncStorage.setItem('showAirQuality', showAirQuality.toString());
  }, [showAirQuality]);

  useEffect(() => {
    AsyncStorage.setItem('use24Hour', use24Hour.toString());
  }, [use24Hour]);

  useEffect(() => {
    AsyncStorage.setItem('language', language);
  }, [language]);

  // Sélecteur langue
  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      {/* Notifications */}
      <View style={styles.settingRow}>
        <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} />
        <Text style={styles.label}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      {/* Unité */}
      <View style={styles.settingRow}>
        <Ionicons name="thermometer-outline" size={24} color="#333" style={styles.icon} />
        <Text style={styles.label}>Unité : {unitInCelsius ? '°C' : '°F'}</Text>
        <Switch
          value={unitInCelsius}
          onValueChange={setUnitInCelsius}
        />
      </View>

      {/* Format horaire */}
      <View style={styles.settingRow}>
        <Ionicons name="time-outline" size={24} color="#333" style={styles.icon} />
        <Text style={styles.label}>Format horaire : {use24Hour ? '24h' : '12h'}</Text>
        <Switch
          value={use24Hour}
          onValueChange={setUse24Hour}
        />
      </View>

      {/* Langue */}
      <TouchableOpacity style={styles.settingRow} onPress={() => setModalVisible(true)}>
        <Ionicons name="language-outline" size={24} color="#333" style={styles.icon} />
        <Text style={styles.label}>Langue : {language}</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#888" />
      </TouchableOpacity>

      {/* Qualité de l'air */}
      <View style={styles.settingRow}>
        <Ionicons name="cloud-outline" size={24} color="#333" style={styles.icon} />
        <Text style={styles.label}>Afficher la qualité de l'air</Text>
        <Switch
          value={showAirQuality}
          onValueChange={setShowAirQuality}
        />
      </View>

      {/* À propos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>À propos</Text>
        <TouchableOpacity>
          <View style={styles.aboutRow}>
            <Ionicons name="information-circle-outline" size={24} color="#007AFF" style={styles.icon} />
            <Link href="/about" style={styles.link}>
              A propos de notre application
            </Link>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal langue */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choisissez la langue</Text>
            {LANGUAGES.map((lang) => (
              <Pressable
                key={lang}
                onPress={() => selectLanguage(lang)}
                style={({ pressed }) => [
                  styles.langOption,
                  pressed && { backgroundColor: '#ddd' },
                  lang === language && styles.langSelected,
                ]}
              >
                <Text style={styles.langText}>{lang}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 16, justifyContent: 'space-between',
  },
  icon: { marginRight: 10 },
  label: { flex: 1, fontSize: 16 },
  section: { marginTop: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  aboutRow: { flexDirection: 'row', alignItems: 'center' },
  link: { fontSize: 16, color: '#007AFF' },

  // Modal styles
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white', borderRadius: 8, padding: 20, width: '80%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  langOption: {
    paddingVertical: 12, paddingHorizontal: 10, borderRadius: 6, marginVertical: 6,
  },
  langSelected: {
    backgroundColor: '#007AFF',
  },
  langText: {
    fontSize: 16, color: 'black',
  },
  closeButton: {
    marginTop: 16, paddingVertical: 10, borderRadius: 6, backgroundColor: '#ccc', alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16, fontWeight: 'bold', color: '#333',
  },
});
