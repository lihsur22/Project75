import firebase from 'firebase';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {emailId : '', passw : ''}
    }

    login = async (email, passw) => {
        if(email && passw){
            try{const response = await firebase.auth().signInWithEmailAndPassword(email, passw)
                if(response){
                    this.props.navigation.navigate('Tabs');
                }
            } catch(error){
                switch(error.code){
                    case 'auth/user-not-found' : alert('User Doesn\'t Exist')
                    break
                    case 'auth/invalid-email' : alert('Invalid Email Address')
                    break
                    case 'auth/wrong-password' : alert('Incorrect Password')
                    break
                }
            }
        } else {
            alert('Enter Email And Password')
        }
    }

    render(){
        return(
            <SafeAreaProvider>
                <KeyboardAvoidingView>
                    <Header
                        backgroundColor={'#ffadec'}
                        centerComponent={{
                            text: 'Story Hub',
                            style: { color: 'fff', fontSize: 20, fontWeight:'bold' },
                        }}
                    />
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.title}></Text>
                        </View>
                        <View style={styles.s}>
                        <TextInput placeholder='abc@emailadress.com' style={styles.textInput} value={this.state.emailId} keyboardType='email-address' onChangeText={(text) => {this.setState({ emailId: text })}}/>
                        </View>
                        <View style={styles.s}>
                            <TextInput placeholder='Password' style={styles.textInput} value={this.state.passw} secureTextEntry={true} onChangeText={(text) => {this.setState({ passw: text })}}/>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>{this.login(this.state.emailId, this.state.passw)}} style={styles.loginButton}>
                                <Text>Log In </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : 250,
        justifyContent : 'center',
        alignItems : 'center',
    },
    s : {
        flexDirection : 'row',
        margin : 10
    },
    loginButton : {
        backgroundColor : '#ffadec',
        padding : 10,
        borderWidth : 2,
        marginTop : 10,
        borderRadius : 10,
    },
    title:{
        textAlign: 'center',
        fontSize: 30,
        fontWeight : 'bold'
    },
    textInput : {
        borderWidth : 2,
        padding : 3,
        paddingHorizontal : 7,
        borderRadius : 100
    }
});