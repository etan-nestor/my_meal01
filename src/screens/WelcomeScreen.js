import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

// constant to stock my logo image
const logo = require('../../assets/welcome.png');

export default function WelcomeScreen() {
  // I personnalize padding of my logo container 1 and 2 to animated
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  // ma navigation constant initialization
  const navigation = useNavigation();
  // I use this hook to anime the logo container padding and automatically introduce HOME
  useEffect(() => {
    // defautl values for my padding variables
    ring1padding.value = 0;
    ring2padding.value = 0;
    // call this function to execute incrementation of padding logo container 1
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );
    // call this function to execute incrementation of padding logo container 2
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5))),
      300
    );
    // call this function continue to Home page after animated transtion of my paddings
    setTimeout(() => navigation.navigate('Home'), 2500);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#01360a" />
        // logo of nestor_mealt welcome page
        <Animated.View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            padding: ring2padding,
          }}>
          <Animated.View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              padding: ring1padding,
            }}>
            <Image style={styles.logo} source={logo} />
          </Animated.View>
        </Animated.View>
        // My title and slogan
        <View style={styles.descrb}>
          <Text style={{ color: 'white', fontSize: hp(5), fontWeight: 'bold' }}>
            FoodieLab
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: hp(2),
              fontWeight: 700,
              textAlign: 'center',
              letterSpacing: 1.5,
            }}>
            🍽️ Learn to cook, step by step 📜
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b7305',
  },
  logo: {
    width: hp(22),
    height: hp(22),
  },
  descrb: {
    alignItems: 'center',
    color: 'white',
    marginTop: 10,
  },
});