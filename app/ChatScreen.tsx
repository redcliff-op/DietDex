import { View, Text, ScrollView, TextInput, FlatList, Pressable, Image } from 'react-native'
import React, { memo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useStore } from '@/src/store/store'
import ChatBubble from '@/components/ChatBubble'
import Collapsible from 'react-native-collapsible';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = memo(() => {

  const { messageList, getGeminiResponse } = useStore((state) => ({
    messageList: state.messageList,
    getGeminiResponse: state.getGeminiResponse
  }))

  const [message, setMessage] = useState<string>("")
  const [pickerCollapsed, setPickerCollapsed] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)

  const loadImage = async (camera: boolean) => {
    let result: ImagePicker.ImagePickerResult
    (camera) ?
      result = await ImagePicker.launchCameraAsync()
      : result = await ImagePicker.launchImageLibraryAsync()
    setImage(result.assets!![0].uri)
    setPickerCollapsed(true)
  }

  return (
    <SafeAreaView className='flex-1 justify-between bg-background px-4'>
      <View className='flex-initial'>
        <Text className='text-white font-bold text-2xl'>
          DexAI!
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          className='flex-initial'
          data={messageList.toReversed()}
          inverted
          renderItem={({ item }) =>
            <ChatBubble messageItem={item} />
          }
        />
      </View>
      <View>
        <Collapsible collapsed={pickerCollapsed}>
          <View className='flex-row rounded-3xl p-2 my-2 mx-2 bg-darkgray'>
            <Pressable
              className='mr-1 flex-[0.5] items-center justify-center bg-background rounded-2xl p-2 flex-row'
              onPress={() => {
                loadImage(true)
              }}
            >
              <Ionicons
                name='camera'
                size={40}
                color={'white'}
              />
              <Text className='ml-2 text-lg font-bold text-white'>
                Camera
              </Text>
            </Pressable>
            <Pressable
              className='ml-1 flex-[0.5] items-center justify-center bg-background rounded-2xl p-2 flex-row'
              onPress={() => {
                loadImage(false)
              }}
            >
              <Ionicons
                name='file-tray-outline'
                size={40}
                color={'white'}
              />
              <Text className='ml-2 text-lg font-bold text-white'>
                Library
              </Text>
            </Pressable>
          </View>
        </Collapsible>
        <Collapsible collapsed={!image}>
          <View className='flex-row items-center justify-center rounded-3xl p-2 my-2 mx-2 bg-darkgray'>
            <Image
              borderRadius={20}
              source={{ uri: image?.toString() }}
              className='w-[100%] h-[400]'
            />
          </View>
        </Collapsible>
        <Animated.View
          className='items-center m-2 px-1 flex-row self-stretch rounded-full border-2 justify-between border-primary'
          sharedTransitionTag='dex'
        >
          <View className='flex-row items-center flex-auto'>
            {(!image) ? (
              <Ionicons
                style={{ marginLeft: 1 }}
                name='add-circle'
                size={40}
                color={'white'}
                onPress={() => {
                  setPickerCollapsed(!pickerCollapsed)
                }}
              />
            ) : (
              <Pressable
                onPress={() => {
                  setImage(null)
                }}
                className='rounded-full p-3 my-1 bg-red-400'
              >
                <Text className='text-base font-bold text-black'>
                  Cancel
                </Text>
              </Pressable>
            )}
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
            className='rounded-full p-2 mr-1'
            onPress={() => {
              useStore.setState({ messageList: [...messageList, { message: message, user: true }] })
              getGeminiResponse(message, image,false)
              setMessage("")
              setImage(null)
            }}
          >
            <Ionicons
              name='send'
              color={'black'}
              size={20}
            />
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
})

export default ChatScreen