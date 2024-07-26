/* eslint-disable prettier/prettier */
import {View, Text, StatusBar, Platform} from 'react-native';
import React from 'react';

export default function ScreenWraper({children}) {
    let statusBarHeight = StatusBar.currentHeight? StatusBar.currentHeight : Platform.OS =='ios' ? 60 : 0;
 return (
    <View style={{paddinTop: statusBarHeight}}>
      {
        children
      }
    </View>
  );
}
