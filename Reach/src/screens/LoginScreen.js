import React, { useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { validateInputField } from '../utilities/inputFieldCheck';
import DeviceInfo from 'react-native-device-info';
import useLogin from '../hooks/Login';
import LinearGradient from 'react-native-linear-gradient';
import RegisterSvg from '../../assets/register_login.svg';
import ReachLogoSvg from '../../assets/Reach_Logo_desc.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#330E44',
  },
  getStartedContainer: {
    height: '70%',
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
  loginBtn: {
    backgroundColor: '#330E44',
    width: '100%',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  linearGradient: {
    flex: 1,
  },
  textWhite: {
    fontFamily: 'aptos-light',
    color: '#fff',
    fontSize: 18,
  },
  textPurple: {
    fontFamily: 'aptos-semibold',
    color: '#330E44',
    fontSize: 18,
    width: '90%',
    textAlign: 'center',
    marginTop: 20,
  },
  logoStyling: {
    position: 'absolute',
    top: '15%',
  },
  userDetailsContainer: {
    height: '50%',
    width: '90%',
  },
  phoneNumberInput: {
    height: '100%',
    width: '80%',
    color: '#000',
    padding: 10,
    fontSize: 17,
    fontFamily: 'aptos',
  },
  countryCodeText: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'aptos',
  },
  inputContainer: {
    height: 50,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#808080',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#505659',
    fontWeight: '300',
  },
  countryCodeContainer: {
    height: 'auto',
    width: '20%',
    borderRightWidth: 2,
    borderRightColor: '#330E44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToRegisterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    width: '100%',
    height: 20,
    fontSize: 13,
    marginTop: 5,
  },
  loginText: {
    color: '#000',
    fontSize: 16,
  },
  loginLink: {
    width: '100%',
    marginStart: 10,
    fontSize: 16,
    color: '#330e44',
    textDecorationLine: 'underline',
  },
  loginErrText: {
    color: 'red',
    width: '100%',
    height: 20,
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
  },
});

const LoginComponent = ({ navigateTo, loginState, loginWithCredentials }) => {
  const [inputVal, setInputVal] = useState({
    phoneNumberProps: {
      phoneNumberVal: false,
      phoneNumberErr: true,
    },
    mailAddressProps: {
      mailAddressVal: false,
      mailAddressErr: true,
    },
    passwordProps: {
      passwordVal: false,
      passwordErr: true,
    },
  });

  const handleLoginBtn = async () => {
    if (
      inputVal.phoneNumberProps.phoneNumberErr === false &&
      inputVal.mailAddressProps.mailAddressErr === false &&
      inputVal.passwordProps.passwordErr === false
    ) {
      const deviceId = await DeviceInfo.getUniqueId();
      const userData = {
        phoneNumber: inputVal.phoneNumberProps.phoneNumberVal,
        mailAddress: inputVal.mailAddressProps.mailAddressVal,
        password: inputVal.passwordProps.passwordVal,
        deviceId,
      };
      loginWithCredentials(userData).then(async () => {
        if (loginState.userVerified) {
          await AsyncStorage.removeItem('userData');
          const loginDataString = JSON.stringify(loginState.loginData);
          await AsyncStorage.setItem('userData', loginDataString);
          navigateTo('start');
        }
      });
    } else {
      handleInputValidation(
        inputVal.phoneNumberProps.phoneNumberVal,
        'phoneNumber',
      );
      handleInputValidation(
        inputVal.mailAddressProps.mailAddressVal,
        'mailAddress',
      );
      handleInputValidation(inputVal.passwordProps.passwordVal, 'password');
    }
  };

  const handleInputValidation = (inputFieldVal, type) => {
    const validateResponse = validateInputField(inputFieldVal, type);
    if (validateResponse !== true) {
      setInputVal(prev => ({
        ...prev,
        [`${type}Props`]: {
          [`${type}Val`]: false,
          [`${type}Err`]: validateResponse,
        },
      }));
    } else {
      setInputVal(prev => ({
        ...prev,
        [`${type}Props`]: {
          [`${type}Val`]: inputFieldVal,
          [`${type}Err`]: false,
        },
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={200}
      style={styles.getStartedContainer}>
      <RegisterSvg />
      <Text style={styles.textPurple}>Login with your Credentials</Text>
      <View style={styles.userDetailsContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneNumberInput}
            keyboardType="number-pad"
            placeholder="Enter your phone number"
            placeholderTextColor={'#505659'}
            onChangeText={text => {
              handleInputValidation(text, 'phoneNumber');
            }}
          />
        </View>
        {inputVal.phoneNumberProps.phoneNumberErr !== false &&
          inputVal.phoneNumberProps.phoneNumberErr !== true && (
            <Text style={styles.errorText}>
              {inputVal.phoneNumberProps.phoneNumberErr}
            </Text>
          )}
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter your mail address"
          placeholderTextColor={'#505659'}
          onChangeText={text => {
            handleInputValidation(text, 'mailAddress');
          }}
        />
        {inputVal.mailAddressProps.mailAddressErr !== false &&
          inputVal.mailAddressProps.mailAddressErr !== true && (
            <Text style={styles.errorText}>
              {inputVal.mailAddressProps.mailAddressErr}
            </Text>
          )}
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter your password"
          placeholderTextColor={'#505659'}
          onChangeText={text => {
            handleInputValidation(text, 'password');
          }}
        />
        {inputVal.passwordProps.passwordErr !== false &&
          inputVal.passwordProps.passwordErr !== true && (
            <Text style={styles.errorText}>
              {inputVal.passwordProps.passwordErr}
            </Text>
          )}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            handleLoginBtn();
          }}>
          <Text style={styles.textWhite}>Login To My Account</Text>
        </TouchableOpacity>
        {inputVal.userExists === false && (
          <Text style={styles.loginErrText}>{loginState.loginData}</Text>
        )}
        <View style={styles.goToRegisterContainer}>
          <Text style={styles.loginText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigateTo('RegisterScreen')}>
            <Text style={styles.loginLink}>Go to Register Page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const LoginScreen = ({ navigation, route }) => {
  const isPageMounted = useRef(true);
  const {
    localState: loginState,
    static: { loginWithCredentials },
  } = useLogin({ isPageMounted });
  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#000044', '#330E44']}
        style={styles.container}>
        <ReachLogoSvg style={styles.logoStyling} />
        <LoginComponent
          navigateTo={navigation.navigate}
          loginState={loginState}
          loginWithCredentials={loginWithCredentials}
        />
      </LinearGradient>
    </>
  );
};

export default LoginScreen;
