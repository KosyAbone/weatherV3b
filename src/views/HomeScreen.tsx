/* eslint-disable react-hooks/exhaustive-deps */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {useUser} from '../controllers/UserContext';
import {userLogOut} from '../controllers/AuthenticationController';

interface Props {
  navigation: StackNavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const userContext = useUser();

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
  }
  // Add this function to navigate to the SearchScreen
  const handleSearchNavigation = () => {
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weatherContainer}>
        <Text style={styles.greeting}>
          Welcome, {userContext.user?.firstName} {userContext.user?.lastName}!
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
      </View>
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearchNavigation}>
          <Text style={styles.searchButton}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchButton} onPress={toCalculatorHistory}>
          <Text style={styles.searchButton}>Calculator History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 15,
  },
  logoutButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#4682b4',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 15,
  },
  searchButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
