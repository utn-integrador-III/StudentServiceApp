/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import ScreenWraper from '../components/screenWraper';
import BackButton from '../components/backButton';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';
export default function ConfigurationScreen() {

  const navigation = useNavigation();

  return (
    <ScreenWraper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className=" absolute top-0 left-0 z-10">
              <BackButton/>
            </View>
            <Text className={`${color.heading} text-xl font-bold text-center mt-8`}>Configuration</Text>
            <Text className={`${color.heading} text-xl `}>Here you can make little configs</Text>
          </View>
          <View>
            <Text className={`${color.heading} text-xl font-bold`}>Go to Zones!</Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Zone')} style={{backgroundColor: color.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold"> Zone</Text>
              </TouchableOpacity>
          </View>
          <View>
            <Text className={`${color.heading} text-xl font-bold`}>Go to Categories!</Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Category')} style={{backgroundColor: color.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold"> Category</Text>
              </TouchableOpacity>
          </View>
          <View className="flex-row justify-center my-3 mt-5">
              <Image className="h-80 w-80" source={require('../assets/images/6.png')}/>
          </View>
          </View>
      </View>
    </ScreenWraper>
  );
}
