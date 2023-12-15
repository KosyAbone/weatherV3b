import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleWeatherSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=194cd0b3c13ae8004fb97e7676467241`
      );

      setWeatherData(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather information');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter City"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleWeatherSearch}>
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>

      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text>{weatherData.name}</Text>
          <Text>{weatherData.main.temp}°C</Text>
          {/* Add more information as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchInput: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#4682b4',
    padding: 10,
    borderRadius: 8,
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default SearchScreen;
