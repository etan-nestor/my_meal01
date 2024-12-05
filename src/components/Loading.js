import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({props}) => {
    return (
        <View className="flex-1 flex justify-center items-center mt-[10rem]">
            <ActivityIndicator style={{ transform: [{ scale: 1.5 }] }}
                color="#1cfc03"
                {...props} />
                <Text className="font-black mt-3 text-xl/2 text-green-500">😊Wait ...</Text>
        </View>
    )
}

export default Loading