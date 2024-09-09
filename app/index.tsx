import { View, Text, Pressable } from 'react-native'
import React, { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import "../constants/styles.css"

const index = memo(() => {
  return (
    <SafeAreaView className='px-2 flex-1 justify-center items-center bg-blue-500'>
      <Pressable
        onPress={()=>{
          router.navigate(`/(tabs)`)
        }}
      >
        <Text className='text-2xl font-bold'>hdsdsbds</Text>
      </Pressable>
    </SafeAreaView>
  )
})

export default index