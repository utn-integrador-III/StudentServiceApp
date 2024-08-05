/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';
import React, { useState } from 'react';
import BackButton from '../components/backButton';
import { useNavigation } from '@react-navigation/native';
import ScreenWraper from '../components/screenWraper';
import { color } from '../thems';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import {RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import usePermission from '../hooks/usePermission';
import { permission } from '../utils/permissions';
import ImagePicker from 'react-native-image-picker';
import dayjs from 'dayjs';

export default function AddReportScreen() {
  const navigation = useNavigation();
  const [date, setDate] = useState(dayjs());
  const [selectImage, setselectImage] = useState('');
  const {checkAndRequestPermission} = usePermission(permission.camera);

  const handleImagePicker = async () => {
    const options = {
      saveToPhotos: false,
      mediaType: 'photo',
    };
    const image = await launchCamera(options, response => {
      if (response.didCancel) {
      } else {
        return response?.assets?.[0]?.uri;
      }
    });
    const imageUri = image?.assets?.[0]?.uri;
    if (imageUri) {
      setselectImage(imageUri);
    }
  };

  const captureImage = async () => {
    const status = await checkAndRequestPermission();
    if (status === RESULTS.GRANTED) {
      handleImagePicker();
    }
  };

  const selectPhoto = () => {
    let options = {
      storageOptions:{
        path:'image',
      },
    };
    launchImageLibrary(options, response=>{
      try{
        setselectImage(response.assets[0].uri);
        console.log(response.assets[0].uri);
      }
      catch(error){
        console.log('Error',error);
      }
    });
  };
  const takePhoto = async () =>{
    let options = {
      saveToPhotos: true,
      madiaType: 'photo',
    };
    const result = await launchCamera(options);
    //setselectImage(result.assets[0].uri);
    console.log(result);
  };
  const data = [
    { label: 'Technology', value: '1' },
    { label: 'Utility', value: '2' },
    { label: 'Other', value: '3' },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
  <ScreenWraper>
      <View className="flex justify-between mx-4">
        <ScrollView>
          <View className="mt-5">
            <View className="relative flex-row justify-between items-center p-4">
              <View className=" absolute top-0 bottom-5 left-0 z-10">
                <BackButton/>
              </View>
              <Text className={`${color.button} text-xl font-bold text-center mt-5`}>New LostObject</Text>
            </View>
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${color.heading} text-lg font-bold`}>Name</Text>
            <TextInput className="p-1 bg-white rounded-full mb-3"/>
            <Text className={`${color.heading} text-lg font-bold`}>Description</Text>
            <TextInput className="p-1 bg-white rounded-full mb-3"/>
            <Text className={`${color.heading} text-lg font-bold`}>Category</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select item' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
            <Text className={`${color.heading} text-lg font-bold mt-3`}> Your Email</Text>
            <TextInput className="p-1 bg-white rounded-full mb-3"/>
            {selectImage ? (
            <Image className="h-48 w-48 self-center" source={{uri: selectImage}} style={styles.selectedImage} />
          ) : null}
            <View className="self-center flex-row mb-7">
                <TouchableOpacity onPress={() => {selectPhoto();}} style={{backgroundColor:'#1B3069' }} className="p-2 w-28 bg-white border border-gray-200 rounded-full items-center">
                  <Text className="text-white">Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {takePhoto();}} style={{backgroundColor:'#f29741' }} className="p-2 w-28 bg-white border border-gray-200 rounded-full items-center">
                  <Text className="text-white">Take Image</Text>
                </TouchableOpacity>
            </View>
          </View>
          <View className="mb-10">
            <TouchableOpacity onPress={()=> navigation.navigate('LostObject')} style={{backgroundColor:'#04bf04' }} className="p-2 px-3 bg-white border border-gray-200 rounded-full items-center mt-5">
              <Text className="text-white">Add Report</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWraper>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems:'center',
    padding: 16,
  },
  img:{
    width: '90%',
    height: 300,
    alignSelf: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
