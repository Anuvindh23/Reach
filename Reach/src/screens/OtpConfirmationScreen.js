import React, { useRef, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import DeviceInfo from 'react-native-device-info';
import RegisterSvg from '../../assets/register_login.svg';
import ReachLogoSvg from '../../assets/Reach_Logo_desc.svg';
import LinearGradient from 'react-native-linear-gradient';
import useRegister from '../hooks/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    fontFamily: 'aptos',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#330E44',
  },
  otpComponentContainer: {
    height: '55%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
  },
  verifyButton: {
    backgroundColor: '#330E44',
    width: '90%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
    textAlign: 'center',
    marginTop: 20,
  },
  logoStyling: {
    position: 'absolute',
    top: '25%',
  },
  inputBox: {
    shadowColor: '#00000033',
    shadowOffset: { width: -2, height: 4 },
  },
  resendContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainerStyle: {
    marginTop: 20,
  },
  textInputStyle: {
    borderWidth: 3,
    borderRadius: 10,
  },
  textPurpleBold: {
    fontFamily: 'aptos',
    color: '#330E44',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '900',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});

const VerifyComponent = ({
  navigateTo = () => {},
  userDetails = {},
  verifyOtp = () => {},
  generateOtp = () => {},
  registerUser = () => {},
}) => {
  const [enteredOtp, setEnteredOtp] = useState();
  const [timeLeft, setTimeLeft] = useState(120);
  const handleVerifyButton = () => {
    verifyOtp(userDetails.mailAddress, enteredOtp).then(async res => {
      if (res) {
        const deviceUniqueId = await DeviceInfo.getUniqueId();
        userDetails.deviceId = deviceUniqueId;
        registerUser(userDetails).then(async registeredData => {
          const [userRegistered, userId] = registeredData;
          const asyncData = {
            userId,
            mailAddress: userDetails.mailAddress,
            phoneNumber: userDetails.phoneNumber,
            deviceId: userDetails.deviceId,
          };
          const userDataString = JSON.stringify(asyncData);
          await AsyncStorage.setItem('userData', userDataString);
          if (userRegistered) {
            navigateTo('start');
          }
        });
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(intervalId);
      } else {
        setTimeLeft(prev => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <>
      <View style={styles.otpComponentContainer}>
        <RegisterSvg />
        <Text style={styles.textPurple}>
          Please check your mail address for OTP
        </Text>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={200}>
          <OTPTextView
            containerStyle={styles.otpContainerStyle}
            textInputStyle={styles.textInputStyle}
            tintColor={'#330E44'}
            handleTextChange={text => {
              setEnteredOtp(text);
            }}
          />
          <View style={styles.resendContainer}>
            <Text style={styles.textPurple}>Didn't received ? </Text>
            <TouchableOpacity
              disabled={timeLeft <= 0 ? false : true}
              onPress={() => {
                generateOtp(userDetails.mailAddress);
              }}>
              <Text style={styles.textPurpleBold}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Text style={styles.textPurple}>
          Try sending OTP again in {timeLeft} seconds ⌛
        </Text>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={() => {
            handleVerifyButton();
          }}>
          <Text style={styles.textWhite}>Verify and Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const OtpConfirmationScreen = ({ navigation, route }) => {
  const isPageMounted = useRef(true);
  const { userDetails } = route.params;
  const {
    static: { generateAndSendOtp, verifyOtpWithMailAddress, registerUser },
  } = useRegister({ isPageMounted });

  useEffect(() => {
    if (isPageMounted && userDetails.mailAddress) {
      generateAndSendOtp(userDetails.mailAddress);
    }
  });
  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#000044', '#330E44']}
        style={styles.container}>
        <ReachLogoSvg style={styles.logoStyling} />
        <VerifyComponent
          navigateTo={navigation.navigate}
          userDetails={userDetails}
          verifyOtp={verifyOtpWithMailAddress}
          generateOtp={generateAndSendOtp}
          registerUser={registerUser}
        />
      </LinearGradient>
    </>
  );
};

export default OtpConfirmationScreen;
