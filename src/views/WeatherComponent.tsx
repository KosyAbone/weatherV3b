import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const apiKey = '1ff0f85841573f8543110133212ec280';
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=44.38&lon=-79.69&exclude=minutely&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) =>
        console.error('Error fetching weather data: ', error)
      );
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {weatherData ? (
          <View>
            <Text style={styles.boldText}>Current Weather</Text>
            <Text>Temperature: {weatherData.current.temp}°C</Text>
            <Text>Feels Like: {weatherData.current.feels_like}°C</Text>
            <Text>Pressure: {weatherData.current.pressure} hPa</Text>
            <Text>Humidity: {weatherData.current.humidity}%</Text>
            <Text>Dew Point: {weatherData.current.dew_point}°C</Text>
            <Text>UV Index: {weatherData.current.uvi}</Text>
            <Text>Clouds: {weatherData.current.clouds}%</Text>
            <Text>Visibility: {weatherData.current.visibility} meters</Text>
            <Text>Wind Speed: {weatherData.current.wind_speed} m/s</Text>
            <Text>Wind Degree: {weatherData.current.wind_deg}°</Text>
            <Text>Wind Gust: {weatherData.current.wind_gust} m/s</Text>
            <Text>
              Sunrise:{' '}
              {new Date(weatherData.current.sunrise * 1000).toLocaleTimeString()}
            </Text>
            <Text>
              Sunset:{' '}
              {new Date(weatherData.current.sunset * 1000).toLocaleTimeString()}
            </Text>
            <Text>Weather: {weatherData.current.weather[0].description}</Text>

            <Text style={styles.boldText}>Hourly Forecast</Text>
            <ScrollView>
              {weatherData.hourly.map((hour: any, index: number) => (
                <View key={index}>
                  <Text style={styles.boldText}>
                    Time: {new Date(hour.dt * 1000).toLocaleTimeString()}
                  </Text>
                  <Text>Temperature: {hour.temp}°C</Text>
                  <Text>Feels Like: {hour.feels_like}°C</Text>
                  <Text>Pressure: {hour.pressure} hPa</Text>
                  <Text>Humidity: {hour.humidity}%</Text>
                  <Text>Dew Point: {hour.dew_point}°C</Text>
                  <Text>UV Index: {hour.uvi}</Text>
                  <Text>Clouds: {hour.clouds}%</Text>
                  <Text>Visibility: {hour.visibility} meters</Text>
                  <Text>Wind Speed: {hour.wind_speed} m/s</Text>
                  <Text>Wind Degree: {hour.wind_deg}°</Text>
                  <Text>Wind Gust: {hour.wind_gust} m/s</Text>
                  <Text>Weather: {hour.weather[0].description}</Text>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.boldText}>Daily Forecast</Text>
            <ScrollView>
              {weatherData.daily.map((day: any, index: number) => (
                <View key={index}>
                  <Text style={styles.boldText}>
                    Date:{' '}
                    {new Date(day.dt * 1000).toLocaleDateString()}
                  </Text>
                  <Text>Max Temperature: {day.temp.max}°C</Text>
                  <Text>Min Temperature: {day.temp.min}°C</Text>
                  <Text>Feels Like - Day: {day.feels_like.day}°C</Text>
                  <Text>Feels Like - Night: {day.feels_like.night}°C</Text>
                  <Text>Pressure: {day.pressure} hPa</Text>
                  <Text>Humidity: {day.humidity}%</Text>
                  <Text>Dew Point: {day.dew_point}°C</Text>
                  <Text>UV Index: {day.uvi}</Text>
                  <Text>Clouds: {day.clouds}%</Text>
                  <Text>Wind Speed: {day.wind_speed} m/s</Text>
                  <Text>Wind Degree: {day.wind_deg}°</Text>
                  <Text>Wind Gust: {day.wind_gust} m/s</Text>
                  <Text>Weather: {day.weather[0].description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <Text>Loading weather data...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 24, 
  },
});

export default WeatherComponent;
