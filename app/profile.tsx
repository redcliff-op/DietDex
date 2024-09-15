import { View, Text, Pressable } from 'react-native'
import React, { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { useStore } from '@/src/store/store'

const profile = memo(() => {

  const { userData, signOut } = useStore((state) => ({
    userData: state.userData,
    signOut: state.signOut
  }))

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
      <Pressable
        onPress={()=>{
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