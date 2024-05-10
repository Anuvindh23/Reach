import { useState } from 'react';
import { post } from '../../utilities/apiUtilities.js';

const useLogin = ({ isPageMounted }) => {
  const [localState, setLocalState] = useState({
    userVerified: '',
    loginData: '',
  });
  const loginWithCredentials = async credentials => {
    const response = await post('login/loginWithCredentials', credentials);
    if (response?.status === 'success') {
      if (isPageMounted) {
        if (response.userVerified) {
          setLocalState(prev => ({
            ...prev,
            userVerified: true,
            loginData: response.loginData,
          }));
        } else {
          setLocalState(prev => ({
            ...prev,
            userVerified: false,
            loginData: response.reason,
          }));
        }
      }
    } else {
      console.log(response);
    }
  };

  return {
    localState,
    static: {
      loginWithCredentials,
    },
  };
};

export default useLogin;
