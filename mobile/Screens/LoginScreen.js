import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

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

  signUpUser = () => {
    try {
      // if (this.state.password.length < 6) {
      //   alert("Please enter at least 6 characters")
      //   return;
      // }
      // firebase.auth().createUserWithEmailAndPassword(email, password)
      this.props.navigation.navigate('SignUpScreen');
    } catch (error) {
      console.log(error.toString())
    }

  }

  loginUser = () => {
    try {
      // firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      //   console.log(user)
      // })
      this.props.navigation.navigate('LoginWithScreen');
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
      <ImageBackground source = {require('../Images/people2.png')} style={styles.imagecontainer}>
        <LinearGradient colors = {['rgba(255,113,0,1.0)', 'rgba(255,137,43,.60)']} style = {styles.gradientcontainer}>
          
          <View style = {styles.logoView}> 
            <Image source = {require('../Images/logo.png')} style = {{alignSelf: 'center', marginTop: 100}}/>
            <Text style = {{color: "white", textAlign:'center', fontSize: 50, fontWeight: 'bold', marginTop: 10}} > bustle </Text>
          </View>
                
          <View style = {styles.buttonView}> 
            <Button style = {styles.signupButton}
                full
                rounded
                primary 
                onPress = {() => this.signUpUser()}> 
              <Text style = {{color: "white", textAlign:'center', fontSize: 18}}>SIGN UP</Text>    
            </Button>
              
            <Label style = {styles.loginwithLabel}> ───── login with ─────</Label>
              
            <Button style = {styles.loginButton}
              full
              rounded
              success
              onPress = {() => this.loginUser()}> 
              <Text style = {{color: "#C15600",fontSize: 18}}>BUSTLE ID</Text>    
            </Button>

            <TouchableOpacity style = {styles.facebookButton}
              full
              rounded
              primary 
              onPress = {() => this.loginWithFacebook()}> 
              <Image source = {require('../Images/Vector.png')} style = {{resizeMode: 'stretch', margin: 5}}/>
              <Text style = {{color: "white", fontSize: 18}} >FACEBOOK</Text>    
            </TouchableOpacity>

          </View>
                
        </LinearGradient> 
      </ImageBackground>         
    );
  }
}

const styles = StyleSheet.create({
    imagecontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }, logoView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },buttonView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
    },gradientcontainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }, signupButton: {
      height: 49,
      marginBottom: 10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor: 'rgba(52, 52, 52, 0)',
      borderRadius:6,
      borderWidth: 1,
      borderColor: '#fff',
    }, loginwithLabel: {
      paddingTop:10,
      marginBottom:10,
      fontSize: 16,
    }, loginButton: {
      height: 49,
      marginBottom: 10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor: '#fff',
      borderRadius:6,
      borderWidth: 1,
      borderColor: '#fff'
    }, facebookButton: {
      flexDirection: 'row',
      alignItems: 'center',
      textAlign:'center',
      height: 49,
      marginBottom: 36,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor: '#3B5998',
      borderRadius:6,
      borderWidth: 1,
      borderColor: 'transparent',
    }
});


{/* <Form style = {{flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                    marginTop: 380}}> */}
                {/* <Item floatingLabel>
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
              </Item> */}

            {/* <Button style = {{marginTop: 10}}
                full
                rounded
                primary 
                onPress = {() => this.props.navigation.navigate('MapScreen')}
              > 
                <Text style = {{color: "white"}}>shortcut</Text>    
              </Button> */}

              {/* </Form> */}

export default LoginScreen;