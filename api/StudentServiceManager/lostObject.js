/* eslint-disable prettier/prettier */
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
