import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TipCardProps = {
  icon: string;
  label: string;
  onPress?: () => void;
};

const TipCard: React.FC<TipCardProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity
    style={styles.tipCard}
    onPress={onPress ?? (() => {})}
  >
    <Ionicons name={icon as any} size={30} color="#007AFF" />
    <Text style={styles.tipLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom:15,
  },
  tipLabel: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
});

export default TipCard;
