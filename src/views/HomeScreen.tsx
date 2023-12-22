/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useUser} from '../controllers/UserContext';
import {userLogOut} from '../controllers/AuthenticationController';
import {calculatorStyles} from '../styles/CalculatorStyles';
import WeatherComponent from './WeatherComponent'; // Import the WeatherComponent

interface Props {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const userContext = useUser();
  const [showWeather, setShowWeather] = useState(false);

  let lastTriggerTimestamp = 0;
  const RATE_LIMIT_TIME = 1000;

  useEffect(() => {
    if (userContext.user === null) {
      navigation.navigate('Login');
    }
  }, [userContext.user]);

  const handleLogOut = async () => {
    const currentTime = Date.now();
    if (currentTime - lastTriggerTimestamp >= RATE_LIMIT_TIME) {
      lastTriggerTimestamp = currentTime;
      await userLogOut();
      userContext.setUser(null);
    }
  };

  const toCalculatorHistory = () => {
    navigation.navigate('CalculatorHistory');
  };

  const handleSearchNavigation = () => {
    navigation.navigate('Search');
  };

  const handleWeatherNavigation = () => {
    navigation.navigate('Weather');
    setShowWeather(true);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.weatherContainer}>
            <Text style={styles.greeting}>
              Welcome, {userContext.user?.firstName}{' '}
              {userContext.user?.lastName}!
            </Text>
            <View style={styles.weatherInfo}>
              <Image
                source={require('../assets/weather-icon.png')}
                style={styles.weatherIcon}
                resizeMode="contain"
              />
              <Text style={styles.city}>New York</Text>
              <Text style={styles.temperature}>23°C</Text>
              <Text style={styles.description}>Partly Cloudy</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearchNavigation}>
                <Text>Search</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={calculatorStyles.button}
                onPress={toCalculatorHistory}>
                <Text>Calculator History</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.weatherButton}
                onPress={handleWeatherNavigation}>
                <Text style={{color: 'white'}}>Weather</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogOut}>
                <Text style={{color: 'white'}}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4b525e',
    justifyContent: 'space-between',
    padding: 20,
  },
  weatherContainer: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 40,
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  weatherInfo: {
    flex: 0.8,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
  },
  weatherIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  city: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 25,
  },
  temperature: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 15,
  },
  description: {
    fontSize: 24,
    color: '#fff',
  },
  buttonContainer: {
    width: '80%',
  },
  logoutButton: {
    minWidth: 50,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  logoutButtonText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  searchButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#4682b4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  searchButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  weatherButton: {
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '32cd32',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  weatherButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
