import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';

const firebaseConfig = {
  apiKey: "AIzaSyDs_u1Dcxi5EHhIq7BrydMU-QgM1f-_VYA",
  authDomain: "bustle-e5011.firebaseapp.com",
  databaseURL: "https://bustle-e5011.firebaseio.com",
  projectId: "bustle-e5011",
  storageBucket: "bustle-e5011.appspot.com",
  messagingSenderId: "543693781851",
  appId: "1:543693781851:web:297c8ec3d42325eb"
};

firebase.initializeApp(firebaseConfig);

class LoginScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email:'',
      password: ''
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter at least 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
      this.props.navigation.navigate('MapScreen');
    } catch (error) {
      console.log(error.toString())
    }

  }

  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        console.log(user)
      })
      this.props.navigation.navigate('MapScreen');
    } catch (error) {
      console.log(error.toString())
    }
  }

  async loginWithFacebook() {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('2336505326668715', {permissions: ['public_profile']})

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
      this.props.navigation.navigate('MapScreen');
    }
  }

  render() {
    return (
      
      <Container style = {styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              autoCorrect = {false}
              autoCapitalize = "none" 
              onChangeText = {(email) => this.setState({email})}
            />
          </Item>


        <Item floatingLabel>
          <Label>Password</Label>
          <Input 
            secureTextEntry = {true}
            autoCorrect = {false}
            autoCapitalize = "none" 
            onChangeText = {(password) => this.setState({password})}
          />
        </Item>

        <Button style = {{marginTop: 10}}
          full
          rounded
          success
          onPress = {() => this.loginUser(this.state.email, this.state.password)}
        > 
          <Text style = {{color: "white"}}>Login</Text>    
        </Button>

        <Button style = {{marginTop: 10}}
          full
          rounded
          primary 
          onPress = {() => this.signUpUser(this.state.email, this.state.password)}
        > 
          <Text style = {{color: "white"}}>Sign Up</Text>    
        </Button>

        <Button style = {{marginTop: 10}}
          full
          rounded
          primary 
          onPress = {() => this.loginWithFacebook()}
        > 
          <Text style = {{color: "white"}}>Login With Facebook</Text>    
        </Button>

        </Form>
      </Container>
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

export default LoginScreen;