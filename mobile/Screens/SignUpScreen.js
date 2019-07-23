import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

class SignUpScreen extends React.Component {

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
            
            

            <View style = {{alignItems: 'center', flex: 1}}>

                <View style = {styles.logoView}> 
                    <Image source = {require('../Images/logo.png')} style = {{alignSelf: 'center', marginTop: 100}}/>
                    <Text style = {{color: "white", textAlign:'center', fontSize: 50, fontWeight: 'bold', marginTop: 10}} > sign up </Text>
                </View>

            
                <View style = {styles.inputView}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>

                       
                        <TextInput style = {styles.firstNameBox} 
                            onChangeText={(text) => this.setState({text})}
                            placeholder = 'first name'
                            placeholderTextColor = '#fff'
                            fontSize = '18'/>
                        
                        <TextInput style = {styles.lastNameBox} 
                            onChangeText={(text) => this.setState({text})}
                            placeholder = 'last name'
                            placeholderTextColor = '#fff'
                            fontSize = '18'/>

                    </View>
                    

                    <TextInput style = {styles.textBox} 
                            onChangeText={(text) => this.setState({text})}
                            placeholder = 'user name'
                            placeholderTextColor = '#fff'
                            fontSize = '18'/>

                    <TextInput style = {styles.textBox} 
                            onChangeText={(text) => this.setState({text})}
                            placeholder = 'email'
                            placeholderTextColor = '#fff'
                            fontSize = '18'/>

                    <TextInput style = {styles.textBox} 
                            onChangeText={(text) => this.setState({text})}
                            placeholder = 'password'
                            placeholderTextColor = '#fff'
                            fontSize = '18'/>

                    <TextInput style = {styles.textBox} 
                            onChangeText={(text) => this.setState({text})}
                            placeholder = 're-enter password'
                            placeholderTextColor = '#fff'
                            fontSize = '18'/>


                    <Button style = {styles.signupButton}
                        full
                        rounded
                        primary 
                        onPress = {() => this.signUpUser()}> 
                        <Text style = {styles.textStyle}>SIGN UP</Text>    
                    </Button>

                    <TouchableOpacity style = {styles.facebookButton}
                        full
                        rounded
                        primary 
                        onPress = {() => this.loginWithFacebook()}> 
                        <Image source = {require('../Images/Vector.png')} style = {{margin: 5}}/>
                        <Text style = {{color: "white", fontSize: 18, textAlign: 'center', flex: 1}} >FACEBOOK</Text>    
                    </TouchableOpacity>
  
                </View>
            </View>
          
        </LinearGradient>     
      );
    }
  }
  
  const styles = StyleSheet.create({
      imagecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }, logoView: {
        flex: 1,
        justifyContent: 'center',
      },gradientcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
        marginBottom: 10
      }, loginwithLabel: {
        marginBottom:10,
        fontSize: 16,
      }, facebookButton: {
        borderRadius:6,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 49,
        alignSelf: 'stretch',
        backgroundColor: '#3B5998',
        borderColor: 'transparent',
      }, inputView: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginTop: 10
      }, textBox: {
        position: 'relative',
        marginBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius:6,
        height: 49,
        backgroundColor:'rgba(255,255,255,.2)',
        borderColor: 'white',
        borderWidth: 2,
        alignSelf: 'stretch'
      }, firstNameBox: {
        paddingLeft: 20,
        position: 'relative',
        alignSelf: 'flex-start',
        marginBottom: 10,
        flex: 1,
        marginLeft: 20,
        marginRight: 5,
        marginTop: 10,
        borderRadius:6,
        height: 49,
        backgroundColor:'rgba(255,255,255,.2)',
        borderColor: 'white',
        borderWidth: 2,
    }, lastNameBox: {
        paddingLeft: 20,
        position: 'relative',
        alignSelf: 'flex-end',
        marginBottom: 10,
        flex: 1,
        marginRight: 20,
        marginLeft: 5,
        borderRadius:6,
        height: 49,
        backgroundColor:'rgba(255,255,255,.2)',
        borderColor: 'white',
        borderWidth: 2,
    }, textStyle: {
        color: "white", 
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
  });
  export default SignUpScreen;