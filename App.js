import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './Screens/LoginScreen';
import MapScreen from './Screens/MapScreen';


const AppNavigator = createStackNavigator({
  LoginScreen: {screen : LoginScreen},
  MapScreen: {screen: MapScreen}
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});