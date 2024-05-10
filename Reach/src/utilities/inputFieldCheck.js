const validateInputField = (fieldVal, type) => {
  switch (type) {
    case 'userName':
      return fieldVal.length <= 3
        ? 'The length of username should be greater than 3.'
        : true;
    case 'phoneNumber':
      const val = String(fieldVal);
      return val.length !== 10 ? 'Enter a valid phone number.' : true;
    case 'mailAddress':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(fieldVal) ? 'Enter a valid mail address' : true;
    case 'password':
      if (fieldVal.length < 8) {
        return 'The password must contain atleast 8 characters.';
      }
      // Check if the password contains at least one lowercase letter
      if (!/[a-z]/.test(fieldVal)) {
        return 'The password must contain atleast one lowercase letter.';
      }
      // Check if the password contains at least one uppercase letter
      if (!/[A-Z]/.test(fieldVal)) {
        return 'The password must contain atleast one uppercase letter.';
      }
      // Check if the password contains at least one digit
      if (!/\d/.test(fieldVal)) {
        return 'The password must contain atleast one digit.';
      }
      return true;
  }
};

export { validateInputField };
