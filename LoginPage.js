import { View, Text, StyleSheet, TextInput,Image, TouchableOpacity,Button, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState , useEffect} from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

import CrossIcon from 'react-native-vector-icons/Entypo'

const LoginPage = ({navigation,route}) => {

  const [Modal1Visible,setModal1Visible]=useState(false);
  const [Modal2Visible,setModal2Visible]=useState(false);
  const [Number,setNumber]=useState('');

  const [confirm, setConfirm] = useState(null);
  const [OTP, setOTP] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      navigation.replace('HomePage',{AccountId: user.phoneNumber})
      // console.log(user)
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(OTP);
      if(confirm.confirm(OTP)){
        navigation.navigate('AfterLoginDetails',{AccountId: Number})
        console.log("Code Successful")
        // ConfirmingUser()

      }

    } catch (error) {
      console.log('Invalid code.');
    }
  }


  async function signInWithPhoneNumber(Number) {
    const confirmation = await auth().signInWithPhoneNumber(Number);
    setConfirm(confirmation);
  }


  return (
    <View style={[styles.container]}>

      <Modal animationType='slide' transparent={true} visible={Modal2Visible}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={[{flex:1,justifyContent:'flex-end',alignItems:'flex-end'},Modal2Visible ? {backgroundColor: 'rgba(0,0,0,0.4)'} : '']}>
            <View style={{height:50, width:50, borderRadius:50, backgroundColor:'#808080', margin:15,justifyContent: 'center',alignItems: 'center',}} onTouchEnd={() => {setModal2Visible(!Modal2Visible)}} >
              <CrossIcon name='cross' size={40} color='#fff' />
            </View>
            <View style={{height:290, width:'100%', backgroundColor:'#fff',borderTopLeftRadius:20, borderTopRightRadius:20,alignItems: 'center',}}>
              <TextInput style={{height:50, width:'70%',borderRadius:10,borderBottomWidth:1, backgroundColor:'#f1f1f1', margin:20, textAlign:'center', color:'#000', fontSize:18,fontWeight:'bold',}} keyboardType='number-pad' onChangeText={(Otp) => {setOTP(Otp)}} />
              <TouchableOpacity style={{height:50, width:'35%', borderRadius:10, backgroundColor:'#FF3031', justifyContent: 'center', alignItems: 'center',}} onPress={() => {confirmCode()}} >
                <Text style={{fontSize:20, color:'#fff', fontWeight:'bold'}} >Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType='slide' transparent={true} visible={Modal1Visible}>

        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={[{flex:1,justifyContent:'flex-end',alignItems:'flex-end'},Modal1Visible ? {backgroundColor: 'rgba(0,0,0,0.4)'} : '']}>
              <View style={{height:50, width:50, borderRadius:50, backgroundColor:'#808080', margin:15,justifyContent: 'center',alignItems: 'center',}} onTouchEnd={() => {setModal1Visible(!Modal1Visible)}} >
                <CrossIcon name='cross' size={40} color='#fff' />
              </View>
              <View style={{height:290,width:'100%',borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor:'#fff'}} >
                <View style={{flex:1}}>
                  <View style={{flex:0.5,justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{color:'#000', fontSize:20, fontWeight:'bold'}}>Login or SignUp</Text>
                  </View>
                  <View style={{flex:1,justifyContent: 'flex-start', alignItems:'center'}}>
                    <View style={{flexDirection:'row'}} >
                      <View style={{height:50, width:'15%',marginRight:4,borderRadius:10,borderBottomWidth:1, borderRightWidth:1 ,backgroundColor:'#f1f1f1',justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{fontSize:20, color:'#000', fontWeight:'bold'}}>+91</Text>
                      </View>
                      <TextInput style={{height:50, width:'65%',borderBottomWidth:1,borderLeftWidth:1,borderColor:'#000',borderRadius:10, backgroundColor:'#f1f1f1',color:'#000', fontWeight:'bold', fontSize:20, paddingLeft:20}} maxLength={10} keyboardType='number-pad' 
                      onChangeText={(Num) => {setNumber('+91'+Num)}}/>
                    </View>
                    <TouchableOpacity style={{height:50, width:'35%',borderRadius:10, backgroundColor:'#FF3031', justifyContent: 'center', alignItems: 'center',marginTop:15}} onPress={() => {
                      signInWithPhoneNumber(Number)
                      setModal1Visible(!Modal1Visible)
                      setModal2Visible(!Modal2Visible)
                      }}>
                      <Text style={{color:'#fff',fontSize:18}}>Login</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{flex:0.15,backgroundColor:'#DAE0E2', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{color:'#fff', fontSize:10}}>By continuing, you agree to our | <Text style={{color:'#2475B0'}}>terms and conditions</Text></Text>
                  </View>
                </View>
              </View>
            </View>

        </TouchableWithoutFeedback>

      </Modal>


      <View style={[styles.flex1]}>
        <Image source={require('../Pictures/OnTimeLogo.png')} style={{height:80,width:80, borderRadius:20}} />
        <Text style={{color:'#000', fontSize:20, fontWeight:'bold',marginTop:'1%'}}>Time that Matters</Text>
      
        <View style={{height:155, width:'90%',borderRadius:20,borderWidth:1,marginTop:30 ,justifyContent: 'center', alignItems: 'center',}}>
          <TouchableOpacity style={[styles.LoginButton]} onPress={()=> {setModal1Visible(true)}}>
            <Text style={{color:'#fff', fontSize:16}}>Continue with Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color:'#2475B0', fontSize:12, marginTop:'3%'}}>or login with email?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex:0.07,backgroundColor:'#DAE0E2', alignItems: 'center', justifyContent: 'center',}}>
        <Text style={{color:'#fff', fontSize:10}}>By continuing, you agree to our | <Text style={{color:'#2475B0'}}>terms and conditions</Text></Text>
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  flex1:{
    flex:1.8,
    justifyContent: 'center',
    alignItems:'center',
    justifyContent: 'flex-end',
    marginBottom:100
  },

  LoginButton:{
    height:55,
    width:'80%',
    borderRadius:15,
    backgroundColor:'#FF3031',
    justifyContent: 'center',
    alignItems: 'center',
  }
})