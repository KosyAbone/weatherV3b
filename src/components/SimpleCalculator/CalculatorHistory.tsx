import React from "react";
import { FlatList, ListRenderItem, Text } from "react-native";
import { CalculatorHistoryData, operations } from "./data/CalculatorHistoryData";
import { useCalculatorHistory } from "./CalculatorHistoryContext";
import CalculatorHistoryItem from "./CalculatorHistoryItem";



interface Props {
}

const CalculatorHistory: React.FC<Props> = () => {

    const calculatorHistoryContext = useCalculatorHistory();

    const data: CalculatorHistoryData[] = calculatorHistoryContext.history
  .map((item) => item);


    interface RenderProps {
        item: CalculatorHistoryData
    }
    const renderItem: ListRenderItem<RenderProps['item']> = ({ item }) => (
        <CalculatorHistoryItem historyData={item} />
    );

    return (
        <>
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item)=>item.id}/>
        </>
    );
}
export default CalculatorHistory;