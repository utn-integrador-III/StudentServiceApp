/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManagerStudent from './ApiManager';

export const get_lost_objects = async () => {
    try {
      const result = await ApiManagerStudent('/lostObject', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return result.data;
    } catch (error) {
      // Return a more detailed error or just the response data depending on the error handling strategy
      return error.response ? error.response.data : error.message;
    }
};
export const create_lost_object = async data => {
  try {
    const token = await AsyncStorage.getItem('Token');
      if (!token) {
          console.log(token);
        throw new Error('Authentication token not found');
      }
    const result = await ApiManagerStudent('/lostObject', {
        method : 'POST',
        headers:{
            'content-type':'application/json',
            'Authorization': `${token}`,
        },
        data:data,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};
