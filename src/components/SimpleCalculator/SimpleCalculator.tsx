import React, { useState } from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useCalculatorHistory } from './CalculatorHistoryContext';
import { CalculatorHistoryData, operations, operatorMath } from './data/CalculatorHistoryData';
import { generateID } from '../../util/uuid';
import { calculatorStyles } from '../../styles/CalculatorStyles';

interface Props {

}

const SimpleCalculator: React.FC<Props> = () => {
    const [firstNumber, setFirstNumber] = useState(NaN);
    const [secondNumber, setSecondNumber] = useState(NaN);

    const calculatorHistoryContext = useCalculatorHistory();


    const updateFirstNumber = (text: string) => {
        const number = parseFloat(text);
        setFirstNumber((!Number.isNaN(number) ? number : NaN));
    }

    const updateSecondNumber = (text: string) => {
        const number = parseFloat(text);
        setSecondNumber((!Number.isNaN(number) ? number : NaN));
    }

    const calculate = (operator: string) => {
        if (!Object.keys(operatorMath).includes(operator)) {
            console.error('Invalid operator');
            return;
        }
        const result = operatorMath[operator as keyof typeof operatorMath](firstNumber, secondNumber);

        const newHistoryData: CalculatorHistoryData = {id: generateID(), firstNumber, secondNumber, result, operator: operator as keyof typeof operations};
        
        calculatorHistoryContext.addHistory(newHistoryData);
    }

    return (
    <View>
        <View>
            <TextInput style={calculatorStyles.calculatorInput} keyboardType='numeric' placeholder='Enter first number...' onChangeText={updateFirstNumber}></TextInput>
            <TextInput style={calculatorStyles.calculatorInput} keyboardType='numeric' placeholder='Enter second number...' onChangeText={updateSecondNumber}></TextInput>
        </View>
        <View style={calculatorStyles.buttonContainer}>
            <TouchableOpacity style={calculatorStyles.button} onPress={() => calculate("add")}><Text>+</Text></TouchableOpacity>
            <TouchableOpacity style={calculatorStyles.button} onPress={() => calculate("subtract")}><Text>-</Text></TouchableOpacity>
            <TouchableOpacity style={calculatorStyles.button} onPress={() => calculate("multiply")}><Text>x</Text></TouchableOpacity>
            <TouchableOpacity style={calculatorStyles.button} onPress={() => calculate("divide")}><Text>/</Text></TouchableOpacity>
        </View>
    </View>
    );
}
export default SimpleCalculator;