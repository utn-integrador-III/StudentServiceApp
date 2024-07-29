/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import LostObjectScreen from '../screens/LostObjectScreen';
import BinnacleScreen from '../screens/BinnacleScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ZoneScreen from '../screens/ZoneScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
            <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
            <Stack.Screen options={{headerShown: false, presentation:'modal'}} name="Forgot" component={ForgotPasswordScreen} />
            <Stack.Screen options={{headerShown: false, presentation:'modal'}} name="SignIn" component={SignInScreen} />
            <Stack.Screen options={{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignUpScreen} />
            <Stack.Screen options={{headerShown: false}} name="Configuration" component={ConfigurationScreen} />
            <Stack.Screen options={{headerShown: false}} name="Zone" component={ZoneScreen} />
            <Stack.Screen options={{headerShown: false}} name="Category" component={CategoryScreen} />
            <Stack.Screen options={{headerShown: false}} name="LostObject" component={LostObjectScreen} />
            <Stack.Screen options={{headerShown: false}} name="Binnacle" component={BinnacleScreen} />
        </Stack.Navigator>
  </NavigationContainer>
  );
}
