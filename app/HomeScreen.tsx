import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated from 'react-native-reanimated'
import { router } from 'expo-router'

const HomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 justify-between bg-background px-2'>
      <ScrollView>
        <Text className=' text-white font-bold text-2xl'>
          Welcome User!
        </Text>
        <Text className='text-white text-lg mt-10'>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
        </Text>
      </ScrollView>
      <Animated.View
        className=' m-2 self-center rounded-full bg-primary'
        sharedTransitionTag='dex'
      >
        <Pressable
          onPress={() => {
            router.navigate(`/ChatScreen`)
          }}
        >
          <Text className=' mx-5 my-3 text-lg font-semibold text-black'>
            Try DexAI!
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  )
}

export default HomeScreen