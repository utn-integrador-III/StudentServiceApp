/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import ScreenWraper from '../components/screenWraper';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  useEffect(()=>{
    setTimeout(()=>{
      //handleGetToken();
    }, 20000);
  });
  const navigation = useNavigation();

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('Token');
    console.log(dataToken);
    if(!dataToken){
      navigation.replace('Welcome');
    }
    else{
      navigation.replace('Home');
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.screen)} className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
      <Image source={images[item.imageKey]} className="w-36 h-36 mb-2"/>
      <Text className={`${color.heading} font-bold`}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <ScreenWraper className="flex-1">
        <View className="flex-row justify-between items-center p-4 mt-7">
          <Text className={`${color.heading} font-bold text-3xl shadow-sm`}>Welcome User@utn.ac.cr!</Text>
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
