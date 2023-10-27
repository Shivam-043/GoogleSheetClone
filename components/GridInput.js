import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './NavBar';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';

const GridInput = ({rows, columns}) => {
  const [gridData, setGridData] = useState(
    Array(rows).fill(Array(columns).fill('')),
  );
  // To store a simple value (e.g., a string)
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('Sheet1', JSON.stringify(gridData));
      console.log('Data stored successfully.');
    } catch (error) {
      console.error('Error storing data: ', error);
    }
  };

  // To retrieve data
  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('Sheet1');
      if (data !== null) {
        setGridData(JSON.parse(data));
        console.log('Retrieved data:', data);
      } else {
        console.log('No data found for the specified key.');
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    storeData();
  }, [gridData]);

  const updateGridData = (rowIndex, colIndex, value) => {
    const updatedGridData = [...gridData.map(row => [...row])];
    updatedGridData[rowIndex][colIndex] = value;
    setGridData(updatedGridData);
  };

  const columnHeaders = ['A', 'B', 'C', 'D', 'E'];
  const rowHeaders = Array.from({length: rows}, (_, i) => (i + 1).toString());

  return (
    <View style={{marginTop: 20}}>
      <Navbar onDownload={gridData} />
      <ScrollView horizontal>
        <View>
          <View style={styles.headerRow}>
            <View style={styles.headerCell} />
            {columnHeaders.map((header, colIndex) => (
              <View key={colIndex} style={styles.headerCell}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </View>
          {rowHeaders.map((rowHeader, rowIndex) => (
            <View key={rowHeader} style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.headerText}>{rowHeader}</Text>
              </View>
              {gridData[rowIndex].map((cell, colIndex) => (
                <TextInput
                  key={colIndex}
                  style={styles.input}
                  value={cell}
                  onChangeText={value => {
                    updateGridData(rowIndex, colIndex, value);
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
  },
  headerCell: {
    width: 80, // Adjust the width as needed
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    width: 80, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
  },
});

export default GridInput;
