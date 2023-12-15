/* eslint-disable @typescript-eslint/no-unused-vars */
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
import SimpleCalculator from '../components/SimpleCalculator/SimpleCalculator';
import CalculatorHistory from '../components/SimpleCalculator/CalculatorHistory';

interface Props {
  navigation: StackNavigationProp<any>;
}

const CalculatorScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <View>
        <SimpleCalculator />
      </View>
      <View>
        <CalculatorHistory />
      </View>
    </View>
  );
};

export default CalculatorScreen;
