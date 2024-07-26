/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import ScreenWraper from '../components/screenWraper';
import BackButton from '../components/backButton';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () =>{
    if(email && oldPassword && newPassword){
      // good to go
      navigation.goBack();
      navigation.navigate('Home');
      }else{
        alert('Please fill all the fields');
    }
  };

  return (
    <ScreenWraper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-14">
            <View className=" absolute top-0 left-0 z-10">
              <BackButton/>
            </View>
            <Text className={`${color.heading} text-xl font-bold text-center`}>Reset Password</Text>
          </View>

            <View className="flex-row justify-center my-3 mt-5">
              <Image className="h-60 w-60" source={require('../assets/images/login.png')}/>
            </View>
            <View className="space-y-2 mx-2">
              <Text className={`${color.heading} text-lg font-bold`}>Email</Text>
              <TextInput value={email} onChangeText={value=> setEmail(value)} className="p-4 bg-white rounded-full mb-3"/>
              <Text className={`${color.heading} text-lg font-bold`}>Old Password</Text>
              <TextInput value={oldPassword} onChangeText={value=> setOldPassword(value)}className="p-4 bg-white rounded-full mb-3"/>
              <Text className={`${color.heading} text-lg font-bold`}>New Password</Text>
              <TextInput value={newPassword} onChangeText={value=> setNewPassword(value)}className="p-4 bg-white rounded-full mb-3"/>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: color.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
              <Text className="text-center text-white text-lg font-bold"> Reset Password</Text>
            </TouchableOpacity>
          </View>
      </View>
    </ScreenWraper>
  );
}
