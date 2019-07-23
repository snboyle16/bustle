import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Label, Button, Textarea, Switch, ListItem, Left, Right } from 'native-base';
import { MapView } from 'expo';
import Modal from "react-native-modal";

// const AppContainer = createAppContainer(AppNavigator);

class MapScreen extends React.Component {
  
  state = {
    modalVisible: false,
  };


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }




  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
        }}>
          

          <TouchableOpacity
            position= 'absolute'
            top = {0}
            left = {0}
            onPress= {() => this.setModalVisible(true)}>
            <Image
              style={{width: 65, height: 65}}
              source={require('../Images/post.png')}
            /> 
          </TouchableOpacity>
        </MapView>
        
        <Modal
          backdropOpacity={0.70}
          hasBackDrop={true}
          animationType="slide"
          isVisible={this.state.modalVisible}
          position='center'>

          <Container style ={{
            flex: .80,
            backgroundColor: 	'#87CEFA',
            position: 'center',
            alignItems: 'center',
            borderRadius:50,
            padding: 15 }} >
            
            <Item rounded>
              <Input
                placeholder = 'Event or Activity Name' 
                autoCorrect = {true}
                autoCapitalize = "none"/>
            </Item>

            <Textarea 
              padding
              rowSpan={5}
              bordered
              placeholder="Description">
              <Label>Password</Label>
              <Input 
                autoCorrect = {false}
                autoCapitalize = "none"/>
            </Textarea>

            <ListItem icon> 
              <Left>
                <Text>Event or Activity</Text>
              </Left>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
            
           

            

            <Button style = {{marginTop: 10}}
              full
              rounded
              primary 
              onPress = {() => this.setModalVisible(false)}> 
              <Text style = {{color: "white"}}>close modal</Text>    
            </Button>
          </Container>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});

export default MapScreen;


