/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';

export const permission = {
  camera: Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  gallery: Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};
