import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BellIcon, MagnifyingGlassCircleIcon } from 'react-native-heroicons/outline'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Categories from '../components/Categories';
import axios from 'axios';
import Recipes from '../components/Recipes';

const avatar = require('../../assets/Welcome_logo.png')



export default function HomeScreen() {

  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Beef');

  useEffect(() => {
    getCategories();
    getRecipes();
  }, [])

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([])
  }

  // recuperations data Api categories
  const getCategories = async() => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      //  console.log('data',response.data)
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error :', err.message);
    }
  }
  // recuperations data Apis Les recettes
  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      //  console.log('data',response.data)
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error :', err.message);
    }
  }

  return (
    <>
      <View className="flex-1 bg-white">
        <StatusBar style="light" backgroundColor='#062b02' />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 5 }}
          className="space-y-6 pt-14"
        >
          {/*  user and notification icon */}
          <View className="mx-4 flex-row justify-between items-center mb-2">
            <Image style={{ width: hp(6), height: hp(6) }} className='bg-green-950 rounded-full' source={avatar} />
            <BellIcon size={hp(4)} color="gray" />
          </View>
          {/* greetings and punchline */}
          <View className="mx-4 space-y-2 mb-2">
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
              Hello Leandre !
            </Text>
            <View>
              <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
                Cook at home,
              </Text>
            </View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">
              enjoy your <Text className="text-green-400">meals.</Text>
            </Text>
          </View>
          {/* search bar of my food leasons */}
          <View className="mx-4 flex-row rounded-full bg-black/5 p-[6px]">
            <TextInput
              placeholder='search any recipe ...'
              placeholderTextColor={'gray'}
              style={{ fontSize: hp(1.7) }}
              className='flex-1 text-base mb-1 pl-3 tracking-wider'
            />
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassCircleIcon size={hp(2.8)} strokeWidth={3} color='gray' />
            </View>
          </View>
          {/* categories of mealt */}
          <View>
            {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory}  handleChangeCategory={handleChangeCategory} />}
          </View>
          {/* recipes */}
          <View>
            <Recipes meals={meals} categories={categories} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
