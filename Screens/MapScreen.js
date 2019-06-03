import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { MapView } from 'expo';



class MapScreen extends React.Component {
  render() {
    return (
        <MapView style={{ flex: 1 }}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

export default MapScreen;


