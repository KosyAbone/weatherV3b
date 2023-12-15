import React, { useState } from 'react';
import {View, Text, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useCalculatorHistory } from './CalculatorHistoryContext';
import { CalculatorHistoryData, operations, operatorMath } from './data/CalculatorHistoryData';
import { generateID } from '../../util/uuid';

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
    <>
    <TextInput keyboardType='numeric' placeholder='Enter first number...' onChangeText={updateFirstNumber}></TextInput>
    <TextInput keyboardType='numeric' placeholder='Enter second number...' onChangeText={updateSecondNumber}></TextInput>
    <Button title='+' onPress={() => calculate("add")}/>
    <Button title='-' onPress={() => calculate("subtract")}/>
    <Button title='*' onPress={() => calculate("multiply")}/>
    <Button title='/' onPress={() => calculate("divide")}/>
    </>
    );
}
export default SimpleCalculator;