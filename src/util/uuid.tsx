
import uuid from 'react-native-uuid';

export const generateID = () => {
    let newID = uuid.v4();
    if (typeof newID !== 'string') {
      const timestamp = Date.now().toString();
      newID = timestamp;
    }
    return newID;
}