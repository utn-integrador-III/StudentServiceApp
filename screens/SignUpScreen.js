/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import ScreenWraper from '../components/screenWraper';
import BackButton from '../components/backButton';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';
export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () =>{
    if(email && password && name){
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
          <View className="relative mt-5">
          <View className=" absolute top-0 left-0 z-10">
            <BackButton/>
          </View>
          <Text className={`${color.heading} text-xl font-bold text-center`}>SignUp</Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image className="h-60 w-60" source={require('../assets/images/signup.png')}/>
          </View>
          <View className="space-y-2 mx-2">
          <Text className={`${color.heading} text-lg font-bold`}>Name</Text>
            <TextInput value={name} onChangeText={value=> setName(value)} className="p-4 bg-white rounded-full mb-3"/>
            <Text className={`${color.heading} text-lg font-bold`}>Email</Text>
            <TextInput value={email} onChangeText={value=> setEmail(value)} className="p-4 bg-white rounded-full mb-3"/>
            <Text className={`${color.heading} text-lg font-bold`}>Password</Text>
            <TextInput value={password} onChangeText={value=> setPassword(value)}className="p-4 bg-white rounded-full mb-3"/>
            <TouchableOpacity className="flex-row justify-end" onPress={()=> navigation.navigate('SignIn')}>
                <Text>Already In? Sign In</Text>
              </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: color.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWraper>
  );
}
