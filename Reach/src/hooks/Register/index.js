import { post } from '../../utilities/apiUtilities';

const useRegister = ({ isPageMounted }) => {
  const registerUser = async (userData = {}) => {
    const response = await post('register/registerUser', userData);
    if (response?.status === 'success') {
      return [response.userRegistered, response.userId];
    }
  };

  const checkUserExists = async (mailAddress, phoneNumber) => {
    const payload = {
      mailAddress,
      phoneNumber,
    };
    const response = await post('register/checkUserExists', payload);
    if (response.status === 'success') {
      if (response.userExists === 'USER ALREADY EXISTS') {
        return true;
      }
      return false;
    }
  };

  const generateAndSendOtp = async mailAddress => {
    const payload = {
      mailAddress,
    };

    const response = await post('register/sendOtp', payload);
    console.log(response);
  };

  const verifyOtpWithMailAddress = async (mailAddress, otp) => {
    const payload = {
      mailAddress,
      otp,
    };

    const response = await post('register/verifyOtp', payload);
    if (response?.status === 'success') {
      return response.otpVerified;
    }
  };

  return {
    static: {
      registerUser,
      checkUserExists,
      generateAndSendOtp,
      verifyOtpWithMailAddress,
    },
  };
};

export default useRegister;
