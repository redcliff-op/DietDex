import { View, Text, ScrollView, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useStore } from '@/src/store/store'
import ChatBubble from '@/components/ChatBubble'

const ChatScreen = () => {

  const {messageList, getGeminiResponse} = useStore((state)=>({
    messageList: state.messageList,
    getGeminiResponse: state.getGeminiResponse
  }))

  const [message, setMessage] = useState<string>("")

  return (
    <SafeAreaView className='flex-1 justify-between bg-background px-2'>
      <View className='flex-initial'>
        <Text className='text-white font-bold text-2xl'>
          DexAI!
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          className='flex-initial'
          data={messageList}
          renderItem={({item})=>
            <ChatBubble messageItem={item}/>
          }
        />
      </View>
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
        <Pressable
          style={{ backgroundColor: '#D9D9D9' }}
          className='rounded-full p-2'
          onPress={()=>{
            useStore.setState({messageList: [...messageList, {message: message, user:true}]})
            getGeminiResponse(message)
            setMessage("")
          }}
        >
          <Ionicons
            name='send'
            color={'black'}
            size={20}
          />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  )
}

export default ChatScreen