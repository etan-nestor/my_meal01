import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';

const RecipeDetailScreen = (props) => {
    let item = props.route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        getMealData(item.idMeal);
    }, [])


    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            //  console.log('data',response.data)
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log('error :', err.message);
        }
    }

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 0; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;

    }

    const getYoutubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            className="flex-1 bg-white"
        >
            <StatusBar style="light" backgroundColor='#062b02' />
            {/* mes images recettes */}
            <View className='flex-row justify-center'>
                <Image
                    source={{ uri: item.strMealThumb }}
                    sharedTransitionTag={item.strMeal}
                    style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
                />
            </View>
            {/* back button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className='w-full absolute flex-row justify-between items-center pt-14'>
                <TouchableOpacity onPress={() => navigation.goBack()} className='p-2 rounded-full ml-5 bg-white'>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color='#1bd406' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} className='p-2 rounded-full mr-5 bg-white'>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? 'red' : 'gray'} />
                </TouchableOpacity>
            </Animated.View>
            {/* meal description */}
            {
                loading ? (
                    <Loading size='large' className='mt-16' />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8">
                        {/* name and area */}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className='space-y-2'>
                            <Text style={{ fontSize: hp(3) }} classname='font-bold flex-1 text-neutral-700'>
                                {meal?.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} classname='font-medium flex-1 text-neutral-500'>
                                {meal?.strArea}
                            </Text>
                        </Animated.View>
                        {/* msc */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-around'>
                            <View className="flex rounded-full bg-green-500 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='rounded-full bg-white flex items-center justify-center'
                                >
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color='gray' />
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        35
                                    </Text>
                                    <Text style={{ fontSize: hp(1.5) }} className='font-medium text-neutral-500'>
                                        mins
                                    </Text>
                                </View>
                            </View>
                            {/* 2 */}
                            <View className="flex rounded-full bg-green-500 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='rounded-full bg-white flex items-center justify-center'
                                >
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color='gray' />
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        03
                                    </Text>
                                    <Text style={{ fontSize: hp(1.5) }} className='font-medium text-neutral-500'>
                                        Servings
                                    </Text>
                                </View>
                            </View>
                            {/* 3 */}
                            <View className="flex rounded-full bg-green-500 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='rounded-full bg-white flex items-center justify-center'
                                >
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color='gray' />
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>
                                        103
                                    </Text>
                                    <Text style={{ fontSize: hp(1.5) }} className='font-medium text-neutral-500'>
                                        Cal
                                    </Text>
                                </View>
                            </View>
                            {/* 4 */}
                            <View className="flex rounded-full bg-green-500 p-2">
                                <View
                                    style={{ height: hp(6.5), width: hp(6.5) }}
                                    className='rounded-full bg-white flex items-center justify-center'
                                >
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='gray' />
                                </View>
                                <View className='flex items-center py-2 space-y-1'>
                                    <Text style={{ fontSize: hp(2) }} className='font-bold text-neutral-700'>

                                    </Text>
                                    <Text style={{ fontSize: hp(1.5) }} className='font-medium text-neutral-500'>
                                        Easy
                                    </Text>
                                </View>
                            </View>
                        </Animated.View>
                        {/* Ingredients */}
                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className='space-y-4'>
                            <Text style={{ fontSize: hp(2) }} className='font-bold flex-1 text-neutral-700'>
                                Ingredients
                            </Text>
                            <View className='space-y-2 ml-3 justify-center'>
                                {
                                    ingredientsIndexes(meal).map(i => {
                                        return (
                                            <View key={i} className='flex-row gap-4'>
                                                <View
                                                    style={{ width: hp(1.5), height: hp(1.5) }}
                                                    className='bg-green-500 rounded-full'
                                                />
                                                <View className="flex-row gap-3">
                                                    <Text
                                                        style={{ fontSize: hp(1.7) }}
                                                        className='font-extrabold text-neutral-600'>{meal['strMeasure' + i]}
                                                    </Text>
                                                    <Text
                                                        style={{ fontSize: hp(1.7) }}
                                                        className='font-medium text-neutral-600'>{meal['strIngredient' + i]}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>
                        {/* Instructions */}
                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className='space-y-4'>
                            <Text style={{ fontSize: hp(2) }} className='font-bold flex-1 text-neutral-700'>
                                Instructions
                            </Text>
                            <Text style={{ fontSize: hp(1.6) }}>
                                {
                                    meal?.strInstructions
                                }
                            </Text>
                            {/* recipe video */}
                            {
                                meal.strYoutube && (
                                    <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4 mt-2'>
                                        <Text style={{ fontSize: hp(2) }} className='font-bold flex-1 text-neutral-700'>
                                            Recipe Video
                                        </Text>
                                        <View>
                                            <YoutubeIframe
                                                videoId={getYoutubeVideoId(meal.strYoutube)}
                                                height={hp(30)}
                                            />
                                        </View>
                                    </Animated.View>
                                )
                            }
                        </Animated.View>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default RecipeDetailScreen