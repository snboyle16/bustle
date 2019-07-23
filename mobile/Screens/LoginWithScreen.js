import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

class LoginWithScreen extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = ({
        email:'',
        password: '',
      })
    }

    
  
    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user != null) {
          console.log(user)
        }
      })
    }
  
    signUpUser = () => {
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
        
        <LinearGradient colors = {['rgba(255, 164, 91, 1) ', 'rgba(255, 164, 91, 0.54) ']} style = {styles.gradientcontainer}>

            <TouchableOpacity style = {{position: 'absolute', top: 50, left: 35}}>
                <Image style = {{}} source = {require('../Images/backArrow.png')}/> 
            </TouchableOpacity>

            {/* <View style = {{alignItems: 'center', flex: 1}}> */}

                <View style = {styles.logoView}> 
                    <Image source = {require('../Images/logo.png')} style = {{}}/>
                    <Text style = {{color: "white", textAlign:'center', fontSize: 50, fontWeight: 'bold', marginTop: 10}} > sign up </Text>
               
                    <TextInput style = {styles.textBox} 
                        onChangeText={(text) => this.setState({text})}
                        placeholder = 'first name'
                        placeholderTextColor = '#fff'
                        fontSize = '18'/>
                    
                    <TextInput style = {styles.textBox} 
                        onChangeText={(text) => this.setState({text})}
                        placeholder = 'last name'
                        placeholderTextColor = '#fff'
                        fontSize = '18'/>

                   

                    


                    <Button style = {styles.signupButton}
                        full
                        rounded
                        primary 
                        onPress = {() => this.signUpUser()}> 
                        <Text style = {styles.textStyle}>SIGN UP</Text>    
                    </Button>
               
                {/* </View> */}
            </View>
          
        </LinearGradient>     
      );
    }
  }
  
  const styles = StyleSheet.create({
      logoView: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        // backgroundColor:'red',
        width: '100%'
      },gradientcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      },signupButton: {
        height: 49,
        backgroundColor: '#6100FF',
        borderRadius:6,
        borderWidth: 1,
        borderColor: 'rgba(52, 52, 52, 0)',
        paddingRight: 20,
        paddingLeft: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
      }, loginwithLabel: {
        marginBottom:10,
        fontSize: 16,
      }, textBox: {
        position: 'relative',
        marginTop: 10,
        paddingLeft: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius:6,
        height: 49,
        backgroundColor:'rgba(255,255,255,.2)',
        borderColor: 'white',
        borderWidth: 2,
        alignSelf: 'stretch'
      },textStyle: {
        color: "white", 
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
  });
  export default LoginWithScreen;