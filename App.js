import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import GridInput from './components/GridInput';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <GridInput rows={10} columns={5} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
