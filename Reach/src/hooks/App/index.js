import React from 'react';
import axios from 'axios';

const useApp = ({ isPageMounted }) => {
  const checkDeviceEntry = async deviceId => {
    const payload = { deviceId };
    const checkDeviceEntryResponse = await axios.post(
      'http://localhost:3000/common/checkDeviceEntry',
      payload,
    );
  };

  return {
    checkDeviceEntry,
  };
};

export default useApp;
