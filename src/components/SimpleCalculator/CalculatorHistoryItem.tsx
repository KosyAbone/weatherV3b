import React from "react";
import { Text } from "react-native";
import { CalculatorHistoryData, operations } from "./data/CalculatorHistoryData";



interface Props {
    historyData: CalculatorHistoryData;
}

const CalculatorHistoryItem: React.FC<Props> = ({historyData}) => {
    return (
        <>
        <Text>{historyData.firstNumber}</Text>
        <Text>{operations[historyData.operator]}</Text>
        <Text>{historyData.secondNumber}</Text>
        <Text>= {historyData.result}</Text>
        </>
    );
}

export default CalculatorHistoryItem;