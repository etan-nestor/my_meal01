import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const avatar = require('../../assets/avatar.png')



export default function HomeScreen() {
  return (
    <>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 5 }}
        >
        //  user and notification icon
          <View className="">
            <Image source={avatar} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
