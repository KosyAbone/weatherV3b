import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleWeatherSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=194cd0b3c13ae8004fb97e7676467241`,
      );

      setWeatherData(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather information:' + error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter City"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleWeatherSearch}>
        <Text> Search </Text>
      </TouchableOpacity>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>
            {weatherData.name}, {weatherData.sys.country}
          </Text>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          <Text style={styles.weatherDescription}>
            {weatherData.weather[0].description}
          </Text>

          <View style={styles.extraInfoContainer}>
            <View style={styles.infoItem}>
              <Icon name="tint" size={20} color="#4682b4" />
              <Text>{weatherData.main.humidity}%</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="wind" size={20} color="#4682b4" />
              <Text>{weatherData.wind.speed} m/s</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="tachometer" size={20} color="#4682b4" />
              <Text>{weatherData.main.pressure} hPa</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4b525e',
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
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 32,
    marginBottom: 5,
  },
  weatherDescription: {
    fontSize: 18,
    marginBottom: 15,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  infoItem: {
    alignItems: 'center',
  },
});

export default SearchScreen;
