import { View, Text, Pressable, FlatList } from 'react-native'
import React, { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { useStore } from '@/src/store/store'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

const profile = memo(() => {

  const { userData, signOut, scanHistory } = useStore((state) => ({
    userData: state.userData,
    signOut: state.signOut,
    scanHistory: state.scanHistory
  }))

  const handleResponse = async(response: ProductAnalysis) => {
    router.dismiss(1)
    await new Promise(resolve => setTimeout(resolve, 100));
    useStore.setState({response: response, responseImage: null})
  }

  return (
    <SafeAreaView className='flex-1 bg-background px-4 justify-between'>
      <View>
        <Animated.Image
          sharedTransitionTag='pfp'
          source={{ uri: userData?.user.photo?.toString() }}
          className=' w-[60%] self-center rounded-full aspect-square'
          style={{
            borderColor: '#bdb3e4',
            borderWidth: 4,
          }}
        />
        <Text className='text-white text-center mt-4 text-2xl font-bold'>
          {userData?.user.name}
        </Text>
        <Text className='text-gray-300 text-center text-base'>
          {userData?.user.email}
        </Text>
      </View>
      <Animated.View
        sharedTransitionTag='hist'
        className='bg-darkgray my-4 p-2 max-h-[50%] rounded-3xl overflow-hidden'
      >
        <View className='flex-row items-center justify-between'>
          <Text className='text-white text-lg p-2 font-bold'>
            Scan History
          </Text>
          <Pressable
            onPress={() => {
              router.navigate(`/history`)
            }}
          >
            <Text className='text-primary text-base text-center px-2 my-2 font-bold'>
              View all
            </Text>
          </Pressable>
        </View>
        <FlatList
          className='mb-2'
          showsVerticalScrollIndicator={false}
          data={scanHistory}
          renderItem={({ item }) =>
            <Pressable
              onPress={()=>{
                handleResponse(item)
              }}
              className='flex-row justify-between items-center my-1 rounded-xl p-4 bg-background'
            >
              <View>
                {item.brand ? <Text className='text-primary text-base font-bold'>{item.brand}</Text> : null}
                {item.product_name ? <Text className='text-primary text-base font-bold'>{item.product_name}</Text> : null}
              </View>
              <Ionicons
                name='arrow-forward-sharp'
                size={20}
                color={'white'}
              />
            </Pressable>
          }
        />
      </Animated.View>
      <Pressable
        onPress={() => {
          signOut()
        }}
        className='rounded-full mb-2.5 p-4 bg-primary'
      >
        <Text className='text-center text-black text-lg font-bold'>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  )
})

export default profile