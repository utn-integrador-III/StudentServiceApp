/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';
export const user_login = async data => {
  try {
    const result = await ApiManager('/auth/login', {
        method : 'POST',
        headers:{
            'content-type':'application/json',
        },
        data:data,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const user_register = async data => {
  try {
    const result = await ApiManager('/user/enrollment', {
        method : 'POST',
        headers:{
            'content-type':'application/json',
        },
        data:data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const verify_auth = async () => {
  try {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('Token');
    if (!token) {
        console.log(token);
      throw new Error('Authentication token not found');
    }

    const result = await ApiManager('/auth/verify_auth', {
      method: 'POST',
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
