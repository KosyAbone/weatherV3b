import React from "react";
import { calculatorStyles } from "../styles/CalculatorStyles";
import { Text, TouchableOpacity, View } from "react-native";
import CalculatorHistory from "../components/SimpleCalculator/CalculatorHistory";
import { StackNavigationProp } from "@react-navigation/stack";


interface Props {
    navigation: StackNavigationProp<any>;
}


const CalculatorHistoryScreen: React.FC<Props> = ({navigation}) => {
    const toCalculator = () => {
      navigation.navigate('Calculator');
    }
  
    return (
        <View style={calculatorStyles.historyContainer}>
              <View>
              <Text style={calculatorStyles.calculatorTitle}>History</Text>
                  <CalculatorHistory/>
              </View>
              <TouchableOpacity style={calculatorStyles.button}onPress={toCalculator}><Text>Go to calculator</Text></TouchableOpacity>
        </View>
    );
}

export default CalculatorHistoryScreen;