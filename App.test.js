// Rename this file to App.js temporarily to test if the basic setup loads.
// If you see a red background with "Hello Xtreem Drive" centered — RN works.
// Then swap back to the real App.js to diagnose the actual app.
import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#e74c3c', alignItems: 'center', justifyContent: 'center' }}>
      <MaterialIcons name="electric-bolt" size={80} color="#fff" />
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 16 }}>
        Hello Xtreem Drive
      </Text>
    </View>
  );
}
