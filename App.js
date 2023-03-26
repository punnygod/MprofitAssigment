/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Dashboard from './screens/Dashboard';
import Spending from './screens/Spending';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

const add = require('./assets/add.png');

const Profile = () => {
  return <Text style={styles.text}>Profile screen</Text>;
};
const Wallet = () => {
  return <Text style={styles.text}>Wallet screen</Text>;
};
const Calendar = () => {
  return <Text style={styles.text}>Calendar screen</Text>;
};

function HomeTabs() {
  return (
    <CurvedBottomBar.Navigator
      screenOptions={{
        headerShown: false,
      }}
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName="title1"
      borderTopLeftRight
      renderCircle={({selectedTab, navigate}) => (
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Image source={add} style={styles.buttonCreate} />
        </TouchableOpacity>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name="dashboard"
        position="LEFT"
        component={Dashboard}
      />
      <CurvedBottomBar.Screen
        name="calendar"
        position="LEFT"
        component={() => <Calendar />}
      />
      <CurvedBottomBar.Screen
        name="wallet"
        component={() => <Wallet />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name="profile"
        component={() => <Profile />}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
}

const _renderIcon = (routeName, selectedTab) => {
  switch (routeName) {
    case 'dashboard':
      return (
        <Feather
          name={'home'}
          size={25}
          color={routeName === selectedTab ? 'black' : 'gray'}
        />
      );
    case 'profile':
      return (
        <Feather
          name={'user'}
          size={25}
          color={routeName === selectedTab ? 'black' : 'gray'}
        />
      );
    case 'wallet':
      return (
        <Ionicons
          name={'wallet-outline'}
          size={25}
          color={routeName === selectedTab ? 'black' : 'gray'}
        />
      );
    case 'calendar':
      return (
        <Feather
          name={'calendar'}
          size={25}
          color={routeName === selectedTab ? 'black' : 'gray'}
        />
      );
  }
};
const renderTabBar = ({routeName, selectedTab, navigate}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={styles.tabbarItem}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );
};
const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="home" component={HomeTabs} />
          <Stack.Screen name="spending" component={Spending} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCreate: {
    width: 108,
    height: 108,
    bottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  text:{
    color:'#000',
    alignSelf:'center',
  }
});
export default App;
