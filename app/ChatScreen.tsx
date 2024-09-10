import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'

const ChatScreen = () => {

  const [message, setMessage] = useState<string>("")

  return (
    <SafeAreaView className='flex-1 justify-between bg-background px-2'>
      <ScrollView>
        <Text className='text-white font-bold text-2xl'>
          DexAI!
        </Text>
        
      </ScrollView>
      <Animated.View
        className='items-center m-2 px-2 flex-row self-stretch rounded-full border-2 justify-between border-primary'
        sharedTransitionTag='dex'
      >
        <View className='flex-row items-center flex-auto'>
          <Ionicons
            name='add-circle'
            size={40}
            color={'white'}
          />
          <TextInput
            className='flex-1 p-3'
            value={message}
            onChangeText={setMessage}
            placeholder='Ask Anything!'
            placeholderTextColor={'#CBD5E0'}
            style={{ color: 'white' }}
          />
        </View>
        <View
          style={{ backgroundColor: '#D9D9D9' }}
          className='rounded-full p-2'
        >
          <Ionicons
            name='send'
            color={'black'}
            size={20}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

export default ChatScreen