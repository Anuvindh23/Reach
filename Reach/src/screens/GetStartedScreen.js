import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import WalkthroughSvg from '../../assets/getStartedImage.svg';
import ReachLogoSvg from '../../assets/Reach_Logo_desc.svg';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    fontFamily: 'aptos',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#330E44',
  },
  getStartedContainer: {
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  },
  getStartedBtn: {
    backgroundColor: '#330E44',
    width: '90%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  linearGradient: {
    flex: 1,
  },
  textWhite: {
    fontFamily: 'aptos',
    color: '#fff',
  },
  textPurple: {
    fontFamily: 'aptos',
    color: '#330E44',
    fontSize: 16,
    width: '90%',
    textAlign: 'center',
    marginTop: 10,
  },
  logoStyling: {
    position: 'absolute',
    top: '25%',
  },
});

const GetStarted = ({ navigateTo }) => (
  <>
    <View style={styles.getStartedContainer}>
      <WalkthroughSvg />
      <Text style={styles.textPurple}>
        Experience the power of seamless communication with our chat platform
      </Text>
      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={() => {
          navigateTo('RegisterScreen');
        }}>
        <Text style={styles.textWhite}>Get Started</Text>
      </TouchableOpacity>
    </View>
  </>
);

const GetStartedScreen = ({ navigation, route }) => {
  useEffect(() => {
    const checkLoggedInFromThisDevice = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const deviceUniqueId = await DeviceInfo.getUniqueId();
        if (parsedUserData.deviceId === deviceUniqueId) {
          navigation.navigate('start');
        }
      }
    };
    checkLoggedInFromThisDevice();
  });

  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#000044', '#330E44']}
        style={styles.container}>
        <ReachLogoSvg style={styles.logoStyling} />
        <GetStarted navigateTo={navigation.navigate} />
      </LinearGradient>
    </>
  );
};

export default GetStartedScreen;
