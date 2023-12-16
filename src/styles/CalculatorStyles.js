import {StyleSheet} from 'react-native';

export const calculatorStyles = StyleSheet.create({
  calculatorTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  calculatorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  calculatorInput: {
    fontSize: 24,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  button: {
    minWidth: 50,
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flex: 0,
  },
  historyContainer: {
    maxHeight: 300,
  },
  historyItem: {
    marginVertical: 10,
    padding: 5,
    backgroundColor: 'lightblue',
  },
  historyNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
