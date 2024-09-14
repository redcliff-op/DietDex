import { View, Text, Image, Pressable } from 'react-native'
import React, { memo, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@/Keys';
import { useStore } from '@/src/store/store';

const index = memo(() => {

  const animation = useRef(null)

  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID
  });

  const {signIn} = useStore((state)=>({
    signIn: state.signIn
  }))

  return (
    <SafeAreaView className='flex-1 px-2 justify-evenly bg-background items-center'>
      <View>
        <Text className='mb-4 text-white text-lg text-center'>
          Welcome to
        </Text>
        <Text className='text-white text-7xl font-thin text-center'>
          DietDeX!
        </Text>
        <Text className='text-white text-lg text-center'>
          Your personalized AI nutritionist
        </Text>
      </View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: '100%',
          height: '25%'
        }}
        source={require('../assets/raw/login.json')}
      />
      <Pressable
        className='flex-row mx-2  self-stretch items-center justify-center p-5 rounded-full bg-primary'
        onPress={()=>{
          signIn()
        }}
      >
        <Image
          source={require('../assets/icons/google.png')}
          className='w-[30] h-[30] mr-5'
          tintColor={'#000000'}
        />
        <Text className='text-black text-lg font-bold'>
          Sign In
        </Text>
      </Pressable>
    </SafeAreaView>
  )
})

export default index