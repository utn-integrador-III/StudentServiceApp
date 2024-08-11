/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import BackButton from '../components/backButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenWraper from '../components/screenWraper';
import { color } from '../thems';
import { TextInput } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import {RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import usePermission from '../hooks/usePermission';
import { permission } from '../utils/permissions';
import ImagePicker from 'react-native-image-picker';
import dayjs from 'dayjs';
import { get_categories } from '../api/StudentServiceManager/category';
import { create_lost_object } from '../api/StudentServiceManager/lostObject';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddReportScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { LostObject } = route.params || {};
  const [date, setDate] = useState(dayjs());
  const [selectImage, setselectImage] = useState('');
  const [objName, setObjName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const {checkAndRequestPermission: checkCameraPermission} = usePermission(permission.camera);
  const {checkAndRequestPermission: checkGalleryPermission} = usePermission(permission.gallery);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    get_categories()
      .then(response => {
        if (response && response.data) {
          const formattedData = response.data.map(lostObject => ({
            label: lostObject.category_name,
            value: lostObject.category_name,
          }));
          setCategories(formattedData);
        } else {
          console.error('Unexpected API response structure:', response);
        }
      })
      .catch(error => {
        console.error('Failed to fetch categories', error);
      });

    // Set the state with the passed lostObject data if available
    if (LostObject) {
      setObjName(LostObject.name);
      setDescription(LostObject.description);
      setCategory(LostObject.category);
      setEmail(LostObject.user_email);
      //setSelectImage(lostObject.attachment_path); // Assuming attachment_path holds the image URL
    }
  }, [LostObject]);
  
  

  const sendReport = async (file, name) => {
    try {
      // Upload the image to Firebase Storage
      const storageRef = storage().ref('images/' + name);
      await storageRef.putFile(file);
  
      // Get the download URL
      const downloadURL = await storageRef.getDownloadURL();
  
      // Save the download URL to Firestore
      await firestore().collection('images').add({
        url: downloadURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      console.log(downloadURL);
  
      create_lost_object({
        name: objName,
        description: description,
        category: category,
        attachment_path: downloadURL,
        user_email: email,
      }).then(async (result) => {
        navigation.navigate('LostObject');
        // Show alert for photo taken and saved
        Alert.alert('Success', 'Photo taken and saved successfully!');
      });
    } catch (e) {
      console.error('Error uploading image or saving to Firestore:', e);
    }
  };
  
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
    const status = await checkCameraPermission();
    if (status === RESULTS.GRANTED) {
      handleImagePicker();
    }
  };

  const selectPhoto = async () => {
    const status = await checkGalleryPermission();
    if (status === RESULTS.GRANTED) {
      let options = {
        storageOptions:{
          path: 'images',
        },
      };
      launchImageLibrary(options, response => {
        if (response && response.assets) {
          setselectImage(response.assets[0].uri);
          console.log(response.assets[0].uri);
        }
      });
    }
  };

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
            <TextInput value={objName} onChangeText={value => setObjName(value)} className="p-1 bg-white rounded-full mb-3"/>
            <Text className={`${color.heading} text-lg font-bold`}>Description</Text>
            <TextInput onChangeText={value => setDescription(value)} className="p-1 bg-white rounded-full mb-3"/>
            <Text className={`${color.heading} text-lg font-bold`}>Category</Text>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={categories}
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
              setCategory(item.label);
              setIsFocus(false);
            }}
            />
            <Text className={`${color.heading} text-lg font-bold mt-3`}> Finder Email</Text>
            <TextInput onChangeText={value => setEmail(value)} className="p-1 bg-white rounded-full mb-3"/>
            {selectImage ? (
            <Image className="h-48 w-48 self-center" source={{uri: selectImage}} style={styles.selectedImage} />
          ) : null}
            <View className="self-center flex-row mb-7">
                <TouchableOpacity onPress={() => {selectPhoto();}} style={{backgroundColor:'#1B3069' }} className="p-2 w-28 bg-white border border-gray-200 rounded-full items-center">
                  <Text className="text-white">Add Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={captureImage} style={{backgroundColor:'#f29741' }} className="p-2 w-28 bg-white border border-gray-200 rounded-full items-center">
                  <Text className="text-white">Take Image</Text>
                </TouchableOpacity>
            </View>
          </View>
          <View className="mb-10">
            <TouchableOpacity onPress={() => {sendReport(selectImage, objName);}} style={{backgroundColor:'#04bf04' }} className="p-2 px-3 bg-white border border-gray-200 rounded-full items-center mt-5">
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
