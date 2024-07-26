/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWraper from '../components/screenWraper';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';


export default function WelcomeScreen() {
  const navigation = useNavigation();
    return (
    <ScreenWraper>
        <View className="h-full flex justify-around">
            <View className="flex-row justify-center mt-9">
                <Image source={require('../assets/images/Logo-UTN.png')} className="object-scale-down h-48 w-48"/>
            </View>
            <View className="mx-5 mb-20">
                <Text className={`text-center font-bold text-4xl ${color.heading} mb-10`}>Student Service</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('SignIn')} className="shadow p-3 rounded-full mb-5" style={{backgroundColor:color.button}}>
                    <Text className="text-center text-white text-lg font-bold">Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('SignUp')} className="shadow p-3 rounded-full" style={{backgroundColor:color.button}}>
                    <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScreenWraper>
  );
}
