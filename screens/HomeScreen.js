/* eslint-disable handle-callback-err */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWraper from '../components/screenWraper';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verify_auth } from '../api/userAPI';
const images = {
  ajustes: require('../assets/images/ajustes.png'),
  bitacora: require('../assets/images/bitacora.png'),
  lostandfound: require('../assets/images/lostandfound.png'),
};
var items = [
  {
    id:1,
    name: 'Configuration',
    screen: 'Configuration',
    imageKey: 'ajustes',
  },
  {
    id:2,
    name: 'Binnacle',
    screen: 'Binnacle',
    imageKey: 'bitacora',
  },
  {
    id:3,
    name: 'Lost-Object',
    screen: 'LostObject',
    imageKey: 'lostandfound',
  },
];

export default function HomeScreen() {
  const [authenticated, setAuthenticated] = useState(true);
  useEffect(()=>{
  });
  const navigation = useNavigation();

  const handleToken = (name) => {
    verify_auth().then(async (result) => {
      if(result.status === 200){
        setAuthenticated(true);
      }
      else{
        setAuthenticated(false);
      }
    })
    .catch(err => {
      alert('Login failed, wrong credentials');
    });
    if(!authenticated === true){
      alert('Your session has expired, please login again');
      navigation.replace('Welcome');
    }
    else{
      const dataToken =  AsyncStorage.getItem('Token');
      console.log(dataToken);
      if(!dataToken){
        navigation.replace('Welcome');
      }
      else{
        navigation.replace(name);
      }
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.screen)} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
      <Image source={images[item.imageKey]} className="w-36 h-36 mb-2"/>
      <Text className={`${color.heading} font-bold`}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <ScreenWraper>
        <View className="flex-row justify-between items-center p-4 mt-7">
          <Text className={`${color.heading} font-bold text-2xl shadow-sm`}>Welcome User@utn.ac.cr!</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Welcome')} className="p-2 px-3 bg-white border border-gray-200 rounded-full">
            <Text className={color.heading}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center bg-blue-200 rounded-xl mx-4">
          <Image source={require('../assets/images/utn01.png')} className="object-scale-down h-48 w-96"/>
        </View>
        <View className="px-4 space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className={`${color.heading} font-bold text-xl`}>Actions</Text>
          </View>
          <View style={{height: 430}}>
          <FlatList
          data={items}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={renderItem}
        />
          </View>
        </View>
    </ScreenWraper>
  );
}
