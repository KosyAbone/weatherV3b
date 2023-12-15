import React, { ReactNode, createContext, useContext, useState } from 'react';
import { CalculatorHistoryData } from './data/CalculatorHistoryData';

interface CalculatorHistoryContextType {
    history: CalculatorHistoryData[];
    setHistory: React.Dispatch<React.SetStateAction<CalculatorHistoryData[]>>;
    addHistory: (newHistory: CalculatorHistoryData) => void;
    removeHistoryOfIndex: (index: number) => void;
}

const CalculatorHistoryContext = createContext<CalculatorHistoryContextType | undefined>(undefined);

export const useCalculatorHistory = () => {
    const context = useContext(CalculatorHistoryContext);
    if (!context) {
      throw new Error('Provider not found');
    }
    return context;
};


interface CalculatorHistoryProviderProps {
    children: ReactNode;
}


export const CalculatorHistoryProvider: React.FC<CalculatorHistoryProviderProps> = ({children}) => {
    const [calculatorHistory, setCalculatorHistory] = useState<CalculatorHistoryData[]>([]);

    const addHistory = (newHistory: CalculatorHistoryData) => {
        setCalculatorHistory((currentHistory) => [...currentHistory, newHistory]);
    };

    const removeHistoryOfIndex = (index: number) => {
        setCalculatorHistory((currentHistory) => {
            const updatedHistory = [...currentHistory];
            updatedHistory.splice(index, 1);
            return updatedHistory;
        });
    };

    const calculatorContextValue: CalculatorHistoryContextType = {
        history: calculatorHistory,
        setHistory: setCalculatorHistory,
        addHistory,
        removeHistoryOfIndex,
    };
  
    return (
      <CalculatorHistoryContext.Provider value={calculatorContextValue}>
        {children}
      </CalculatorHistoryContext.Provider>
    );
};