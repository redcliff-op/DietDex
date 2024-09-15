import { View, Text, FlatList, Pressable } from 'react-native'
import React, { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStore } from '@/src/store/store'
import Animated from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

const history = memo(() => {

  const { scanHistory } = useStore((state) => ({
    scanHistory: state.scanHistory
  }))

  const handleResponse = async (response: ProductAnalysis) => {
    router.dismiss(2)
    await new Promise(resolve => setTimeout(resolve, 100));
    useStore.setState({response: response, responseImage: null})
  }

  return (
    <SafeAreaView className='flex-1 bg-background px-4 '>
      <Animated.View
        sharedTransitionTag='hist'
        className=' bg-darkgray max-h-[98%] my-2 p-2 rounded-3xl overflow-hidden'
      >
        <Text className='text-white text-lg p-2 font-bold'>
          Scan History
        </Text>
        <FlatList
          className='mb-2 '
          data={scanHistory}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            <Pressable
              onPress={() => {
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
    </SafeAreaView>
  )
})

export default history