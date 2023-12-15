export interface CalculatorHistoryData {
    id: string;
    firstNumber: number;
    secondNumber: number;
    operator: keyof typeof operations;
    result: number;
}

export enum operations {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '/'
}
export type OperatorFunctions = {
    [key in keyof typeof operations]: (a: number, b: number) => number;
};

export const operatorMath: OperatorFunctions = {
    add: (a: number, b: number) => a + b,
    subtract: (a: number, b: number) => a - b,
    multiply: (a: number, b: number) => a * b,
    divide: (a: number, b: number) => a / b,
};