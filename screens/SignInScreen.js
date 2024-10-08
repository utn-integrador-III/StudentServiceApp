/* eslint-disable handle-callback-err */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import {View, Text, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState } from 'react';
import ScreenWraper from '../components/screenWraper';
import BackButton from '../components/backButton';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';
import { user_login } from '../api/userAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignInScreen( ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () =>{
    if(email && password){
      // good to go
      user_login({
        email:email,
        password:password,
      }).then(async (result) => {
        console.log(result.data.message_code);
        if(result.data.status === 'Active'){
          await AsyncStorage.setItem('Token', result.data.token);
          console.log(result.data.token);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      })
      .catch(err => {
        alert('Login failed, wrong credentials');
      });
      }else{
        alert('Please fill all the fields');
    }
  };

  return (
    <ScreenWraper>
      <ScrollView>
        <View className="flex justify-between h-full mx-4">
          <View>
            <View className="relative mt-5">
              <View className=" absolute top-0 left-0 z-10">
                <BackButton/>
              </View>
              <Text className={`${color.heading} text-xl font-bold text-center`}>SignIn</Text>
            </View>
              <View className="flex-row justify-center my-3 mt-5">
                <Image className="h-60 w-60" source={require('../assets/images/login.png')}/>
              </View>
              <View className="space-y-2 mx-2">
                <Text className={`${color.heading} text-lg font-bold`}>Email</Text>
                <TextInput value={email} onChangeText={value=> setEmail(value)} className="p-4 bg-white rounded-full mb-3"/>
                <Text className={`${color.heading} text-lg font-bold`}>Password</Text>
                <TextInput value={password} secureTextEntry={true} onChangeText={value=> setPassword(value)} className="p-4 bg-white rounded-full mb-3"/>
                <TouchableOpacity onPress={()=> navigation.navigate('Forgot')} className="flex-row justify-end">
                  <Text>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('SignUp')} className="flex-row justify-end">
                  <Text>Don't Have an Account? SignUp</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: color.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold"> SignIn</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </ScreenWraper>
  );
}
