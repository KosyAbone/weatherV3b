import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import SimpleCalculator from '../components/SimpleCalculator/SimpleCalculator';
import CalculatorHistory from '../components/SimpleCalculator/CalculatorHistory';
import {calculatorStyles} from '../styles/CalculatorStyles';

interface Props {
  navigation: StackNavigationProp<any>;
}

const CalculatorScreen: React.FC<Props> = ({navigation}) => {
  const toHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <View style={calculatorStyles.calculatorContainer}>
        <View>
          <Text style={calculatorStyles.calculatorTitle}>Calculator</Text>
          <SimpleCalculator />
        </View>
        <View style={calculatorStyles.historyContainer}>
          <Text style={calculatorStyles.calculatorTitle}>History</Text>
          <CalculatorHistory />
        </View>
        <View>
          <TouchableOpacity style={calculatorStyles.button} onPress={toHome}>
            <Text>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalculatorScreen;
