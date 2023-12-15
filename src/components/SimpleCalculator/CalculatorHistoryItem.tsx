import React from "react";
import { Text, View } from "react-native";
import { CalculatorHistoryData, operations } from "./data/CalculatorHistoryData";
import { calculatorStyles } from "../../styles/CalculatorStyles";



interface Props {
    historyData: CalculatorHistoryData;
}

const CalculatorHistoryItem: React.FC<Props> = ({historyData}) => {
    return (
        <View style={calculatorStyles.historyItem}>
        <Text style={calculatorStyles.historyNumber}>{historyData.firstNumber}</Text>
        <Text>{operations[historyData.operator]}</Text>
        <Text style={calculatorStyles.historyNumber}>{historyData.secondNumber}</Text>
        <Text>=</Text>
        <Text style={calculatorStyles.historyNumber}>{historyData.result}</Text>
        </View>
    );
}

export default CalculatorHistoryItem;