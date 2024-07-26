/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import { color } from '../thems';
import { useNavigation } from '@react-navigation/native';

export default function backButton() {
 const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.goBack()} className="bg-white rounded-full h-8">
      <ChevronLeftIcon size={30} color={color.button}/>
    </TouchableOpacity>
  );
}
