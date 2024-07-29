/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManagerStudent from './ApiManager';

export const get_zones = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('Token');
    if (!token) {
        console.log(token);
      throw new Error('Authentication token not found');
    }

    const result = await ApiManagerStudent('/zone', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,  // Include the token in the Authorization header
      },
    });
    return result.data;
  } catch (error) {
    // Return a more detailed error or just the response data depending on the error handling strategy
    return error.response ? error.response.data : error.message;
  }
};
