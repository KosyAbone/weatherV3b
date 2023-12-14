interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserRegData extends UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex: RegExp = /^[A-Za-z0-9~!@#$%^&*()_+]{6,}$/;
const humanNameBlacklistPattern = /[@!#^&*_]+/;

interface OperationResult<T> {
  result: boolean;
  data: T;
  error?: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
  // Additional user data fields can be added here as needed
}

interface UserRegData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const nameIsValid = (name: string): boolean => {
  if (name.trim().length === 0) {
    return false;
  }
  return !humanNameBlacklistPattern.test(name);
};

const emailIsValid = (email: string): boolean => {
  return emailRegex.test(email);
};

/*
Valid password is currently defined as
-alphanumeric characters, ~!@#$%^&*()_+
-at least 6 characters
*/
const passwordIsValid = (password: string): boolean => {
  return passwordRegex.test(password);
};

export {nameIsValid, emailIsValid, passwordIsValid};
export type {OperationResult, UserData, UserRegData};
