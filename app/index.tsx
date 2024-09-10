import { View, Text, Image } from 'react-native'
import React, { memo, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Player } from '@lottiefiles/react-lottie-player';

import '../constants/styles.css'

const index = memo(() => {

  const animation = useRef(null)

  return (
    <SafeAreaView className='flex-1 px-2 justify-center bg-background items-center'>
      <View>
        <Text className='mb-2 text-white text-lg text-center'>
          Welcome to
        </Text>
        <Text className='text-white text-7xl font-thin text-center'>
          DietDeX!
        </Text>
        <Text className='text-white text-lg text-center'>
          Your personalized AI nutritionist
        </Text>
      </View>
      <Player
        autoplay
        loop
        ref={animation}
        style={{ height: '500px', width: '500px' }}
        src={require('../assets/raw/login.json')}
      />
      <View className='flex-row mx-2 items-center justify-center p-5 rounded-full bg-primary'>
        <Text className='text-black text-lg font-bold'>
          Get Started
        </Text>
        
      </View>
    </SafeAreaView>
  )
})

export default index