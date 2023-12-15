import React from "react";
import { Text } from "react-native";
import { CalculatorHistoryData, operations } from "./data/CalculatorHistoryData";
import { useCalculatorHistory } from "./CalculatorHistoryContext";
import CalculatorHistoryItem from "./CalculatorHistoryItem";



interface Props {
}

const CalculatorHistory: React.FC<Props> = () => {

    const calculatorHistoryContext = useCalculatorHistory();

    //Reverse, because logically latest items should be the first
    return (
        <>
        {calculatorHistoryContext.history.reverse().map((item, index)=>(<CalculatorHistoryItem key={item.id} historyData={item}/>))}
        </>
    );
}
export default CalculatorHistory;