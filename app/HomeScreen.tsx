import { View, Text, Pressable, Image, FlatList, ScrollView } from 'react-native'
import React, { memo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useStore } from '@/src/store/store'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from '@expo/vector-icons/Ionicons'
import Collapsible from 'react-native-collapsible'

const HomeScreen = memo(() => {

  const { getGeminiResponse, geminiLoading, userData, handleScanHistory, response, image } = useStore((state) => ({
    getGeminiResponse: state.getGeminiResponse,
    geminiLoading: state.geminiLoading,
    userData: state.userData,
    handleScanHistory: state.handleScanHistory,
    response: state.response,
    image: state.responseImage
  }))

  const [nutCollapsed, setNutCollapsed] = useState<boolean>(true)
  const [vitMinCollapsed, setVitMinCollapsed] = useState<boolean>(true)
  const [ingredCollapsed, setIngredCollapsed] = useState<boolean>(true)
  const [presCollapsed, setPresCollapsed] = useState<boolean>(true)
  const [allerCollapsed, setAllerCollapsed] = useState<boolean>(true)

  const handleGeminiResponse = async () => {
    const img = await ImagePicker.launchImageLibraryAsync()
    const imageUri = img.assets?.[0].uri
    if (imageUri) {
      useStore.setState({ response: null })
      useStore.setState({responseImage: imageUri})
      const result = await getGeminiResponse("", imageUri, true)
      useStore.setState({ response: JSON.parse(result) })
      handleScanHistory(JSON.parse(result))
    }
  }

  return (
    <SafeAreaView className='flex-1 justify-between bg-background px-4'>
      <View className='flex-row justify-between items-center'>
        <View className='flex-row items-center'>
          <Animated.Image
            sharedTransitionTag='pfp'
            source={{ uri: userData?.user.photo?.toString() }}
            className='w-[50] h-[50] rounded-full'
          />
          <Pressable
            onPress={() => {
              router.navigate(`/profile`)
            }}
          >
            <Text className='ml-3 text-white font-bold text-xl'>
              Welcome {userData?.user.givenName}!
            </Text>
            <Text className='ml-3 text-gray-300 text-base'>
              Let's discover healthier choices!
            </Text>
          </Pressable>
        </View>
      </View>
      {(geminiLoading) ? (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className='flex-1 justify-center items-center'
        >
          <LottieView
            autoPlay
            loop
            source={require('../assets/raw/geminiloading.json')}
            style={{
              width: '100%',
              aspectRatio: 1,
            }}
          />
        </Animated.View>
      ) : (
        <View className='flex-1 justify-between'>

          {(!response) ? (
            <Animated.View entering={FadeIn} exiting={FadeOut} className='flex-1 justify-center'>
              <LottieView
                autoPlay
                loop
                source={require('../assets/raw/scanner.json')}
                style={{
                  width: '100%',
                  aspectRatio: 1,
                }}
              />
              <View>
                <Text className=' text-gray-300 text-center mx-2 text-base'>
                  Scan any food item or label to get its nutritional value, health analysis and alot more!
                </Text>
                <Text className=' text-gray-300 text-center my-5 mx-2 text-base'>
                  Ask any follow up questions using DexAI!
                </Text>
              </View>
            </Animated.View>
          ) : (
            <Animated.ScrollView entering={FadeIn} exiting={FadeOut} showsVerticalScrollIndicator={false}>
              <View className='mt-2 items-center rounded-3xl p-3 bg-darkgray flex-row'>
                {image ? <Image
                  source={{ uri: image?.toString() }}
                  className='aspect-square opacity-90 w-[30%]'
                  borderRadius={15}
                /> : null}
                <View className='justify-center items-start'>
                  {response.brand ? <Text numberOfLines={1} className='text-primary ml-3 text-2xl font-bold overflow-ellipsis'>{response.brand}</Text> : null}
                  {response.product_name ? <Text numberOfLines={1} className='text-primary ml-3 text-xl font-bold overflow-ellipsis'>{response.product_name}</Text> : null}
                  {response.weight ? <Text numberOfLines={1} className='text-primary ml-3 text-lg font-bold overflow-ellipsis'>{response.weight} gm</Text> : null}
                </View>
              </View>
              <View className='rounded-full bg-primary mt-2 py-2 px-4'>
                {response.processed_level ? <Text numberOfLines={1} className='text-black text-center text-lg font-bold overflow-ellipsis'>{response.processed_level}</Text> : null}
              </View>
              <View className='flex-row bg-darkgray p-2 rounded-3xl mt-2'>
                {(response.keto_friendly !== null || undefined) ? <View
                  className='mr-2 rounded-3xl flex-1 p-1'
                  style={{ backgroundColor: (response.keto_friendly) ? '#81C784' : '#EE8A8A' }}
                >
                  <Text className='text-center text-black text-base font-bold'>Keto{"\n"}Friendly</Text>
                </View> : null}
                {(response.diabetic_friendly !== null || undefined) ? <View
                  className='mr-2 rounded-3xl flex-1 p-1'
                  style={{ backgroundColor: (response.diabetic_friendly) ? '#81C784' : '#EE8A8A' }}
                >
                  <Text className='text-center text-black text-base font-bold'>Diabetic{"\n"}Friendly</Text>
                </View> : null}
                {(response.vegan !== null || undefined) ? <View
                  className='rounded-3xl flex-1 p-1'
                  style={{ backgroundColor: (response.vegan) ? '#81C784' : '#EE8A8A' }}
                >
                  <Text className='text-center text-black text-base font-bold'>Vegan{"\n"}Friendly</Text>
                </View> : null}
              </View>
              {(response.health_analysis) ?
                <View className='mt-2 p-2 rounded-3xl bg-darkgray'>
                  <Text className='text-primary text-lg font-bold p-2'>Health Analysis</Text>
                  <Text className='text-white text-base p-2'>{response.health_analysis}</Text>
                </View>
                : null}
              {(response.brand_claims_validation && response.proprietary_claims) ?
                <View className='mt-2 p-2 rounded-3xl bg-darkgray'>
                  <Text className='text-primary text-lg font-bold p-2'>Brand Claims</Text>
                  <FlatList
                    data={response.proprietary_claims}
                    renderItem={({ item }) =>
                      <Text className='text-white text-base px-2'>{item}</Text>
                    }
                  />
                  <Text className='text-primary text-lg font-bold p-2'>Claims Validation</Text>
                  <Text className='text-white text-base px-2 mb-2'>{response.brand_claims_validation}</Text>
                </View>
                : null}
              {(response.nutrients?.calories) ?
                <Pressable
                  className='mt-2 p-2 rounded-3xl bg-darkgray'
                  onPress={() => setNutCollapsed(!nutCollapsed)}
                >
                  <View className='flex-row p-2 justify-between'>
                    <Text className='text-primary text-lg font-bold'>Nutritional Info</Text>
                    <Ionicons size={25} name={nutCollapsed ? 'arrow-down-outline' : 'arrow-up-outline'} color={'white'} />
                  </View>
                  <Collapsible collapsed={nutCollapsed}>
                    {Object.entries({
                      Calories: response.nutrients.calories,
                      'Total Fats': response.nutrients.fats?.total,
                      'Saturated Fats': response.nutrients.fats?.saturated_fats,
                      'Trans Fats': response.nutrients.fats?.trans_fats,
                      Sugars: response.nutrients.sugars,
                      Sodium: response.nutrients.sodium,
                      Protein: response.nutrients.protein,
                      Carbohydrates: response.nutrients.carbohydrates,
                      Fibers: response.nutrients.fiber
                    }).map(([label, value]) =>
                      value && (
                        <View key={label} className='rounded-xl mt-2 bg-black p-3 justify-between flex-row'>
                          <Text className='text-primary text-base'>{label}</Text>
                          <Text className='text-white text-base'>{value}</Text>
                        </View>
                      )
                    )}
                    {(response.nutrient_deficits?.length !== 0) ?
                      <View>
                        <Text className='text-primary text-lg font-bold mt-2'>Nutritional Deficits</Text>
                        <FlatList
                          data={response.nutrient_deficits}
                          renderItem={({ item, index }) =>
                            <View className='rounded-xl mt-2 bg-black p-3 justify-between flex-row'>
                              <Text className='text-primary text-base'>{item}</Text>
                              <Text className='text-white text-base'>{index + 1}</Text>
                            </View>
                          }
                        />
                      </View>
                      : null}
                    <View className='p-1'></View>
                  </Collapsible>
                </Pressable> : null}
              {(response.minerals?.length !== 0 || response.vitamins?.length !== 0) ?
                <Pressable
                  className='mt-2 p-2 rounded-3xl bg-darkgray'
                  onPress={() => setVitMinCollapsed(!vitMinCollapsed)}
                >
                  <View className='flex-row p-2 justify-between'>
                    <Text className='text-primary text-lg font-bold'>Vitamins and Minerals</Text>
                    <Ionicons size={25} name={vitMinCollapsed ? 'arrow-down-outline' : 'arrow-up-outline'} color={'white'} />
                  </View>
                  <Collapsible collapsed={vitMinCollapsed}>
                    <FlatList
                      data={response.minerals}
                      renderItem={({ item, index }) =>
                        <View className='rounded-xl mt-2 bg-black p-3 justify-between flex-row'>
                          <Text className='text-primary text-base'>{item}</Text>
                          <Text className='text-white text-base'>{index + 1}</Text>
                        </View>
                      }
                    /></Collapsible>
                </Pressable> : null}
              {(response.ingredients?.length !== 0) ?
                <Pressable
                  className='mt-2 p-2 rounded-3xl bg-darkgray'
                  onPress={() => setIngredCollapsed(!ingredCollapsed)}
                >
                  <View className='flex-row p-2 justify-between'>
                    <Text className='text-primary text-lg font-bold'>Ingredients</Text>
                    <Ionicons size={25} name={ingredCollapsed ? 'arrow-down-outline' : 'arrow-up-outline'} color={'white'} />
                  </View>
                  <Collapsible collapsed={ingredCollapsed}>
                    <FlatList
                      data={response.ingredients}
                      renderItem={({ item, index }) =>
                        <View className='rounded-xl mt-2 bg-black p-3 justify-between flex-row'>
                          <Text className='text-primary text-base'>{item}</Text>
                          <Text className='text-white text-base'>{index + 1}</Text>
                        </View>
                      }
                    /></Collapsible>
                </Pressable> : null}
              {(response.preservatives?.length !== 0 || response.artificial_additives?.length !== 0) ?
                <Pressable
                  className='mt-2 p-2 rounded-3xl bg-darkgray'
                  onPress={() => setPresCollapsed(!presCollapsed)}
                >
                  <View className='flex-row p-2 justify-between'>
                    <Text className='text-primary text-lg font-bold'>Preservatives and Additives</Text>
                    <Ionicons size={25} name={presCollapsed ? 'arrow-down-outline' : 'arrow-up-outline'} color={'white'} />
                  </View>
                  <Collapsible collapsed={presCollapsed}>
                    <FlatList
                      data={response.preservatives?.concat(response.artificial_additives!!)}
                      renderItem={({ item, index }) =>
                        <View className='rounded-xl mt-2 bg-black p-3 justify-between flex-row'>
                          <Text className='text-primary text-base'>{item}</Text>
                          <Text className='text-white text-base'>{index + 1}</Text>
                        </View>
                      }
                    /></Collapsible>
                </Pressable> : null}
              {(response.allergens?.length !== 0) ?
                <Pressable
                  className='mt-2 p-2 rounded-3xl bg-darkgray'
                  onPress={() => setAllerCollapsed(!allerCollapsed)}
                >
                  <View className='flex-row p-2 justify-between'>
                    <Text className='text-primary text-lg font-bold'>Allergens</Text>
                    <Ionicons size={25} name={allerCollapsed ? 'arrow-down-outline' : 'arrow-up-outline'} color={'white'} />
                  </View>
                  <Collapsible collapsed={allerCollapsed}>
                    <FlatList
                      data={response.allergens}
                      renderItem={({ item, index }) =>
                        <View className='rounded-xl mt-2 bg-black p-3 justify-between flex-row'>
                          <Text className='text-primary text-base'>{item}</Text>
                          <Text className='text-white text-base'>{index + 1}</Text>
                        </View>
                      }
                    /></Collapsible>
                </Pressable> : null}
              <View className='py-5'></View>
            </Animated.ScrollView>
          )}
          <Pressable
            className='mx-2 mb-2.5 rounded-full p-4 bg-primary'
            onPress={() => {
              handleGeminiResponse()
            }}
          >
            <Text className=' items-center text-lg text-center font-bold text-black'>
              Scan!
            </Text>
          </Pressable>
        </View>
      )}
      <Animated.View
        className=' absolute bottom-1 right-5 m-2 self-end p-3 rounded-full  bg-darkgray'
        sharedTransitionTag='dex'
      >
        <Pressable
          onPress={() => {
            router.navigate(`/ChatScreen`)
          }}
        >
          <LottieView
            autoPlay
            loop
            speed={0.3}
            style={{
              height: 30,
              width: 30
            }}
            source={require('../assets/raw/gemini.json')}
          />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  )
})

export default HomeScreen