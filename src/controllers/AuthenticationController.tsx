import {OperationResult, UserData, UserRegData} from '../models/UserModel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://server-app6-3209e8a76d7d.herokuapp.com';

const userLogin = async (
  email: string,
  password: string,
): Promise<OperationResult<{email: string; token?: string}>> => {
  try {
    const response: OperationResult<UserData> = await axios.post(
      `${API_BASE_URL}/auth/login`,
      {
        email,
        password,
      },
    );
    const {email: userEmail, token} = response.data;

    // Storing the token in AsyncStorage for later use
    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }

    return {
      result: true,
      data: {
        email: userEmail,
        token: token || '',
      },
    };
  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred';
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }
    console.error(errorMessage);
    return {
      result: false,
      data: {} as UserData,
      error: errorMessage,
    };
  }
};

const userRegister = async ({
  firstName,
  lastName,
  email,
  password,
}: UserRegData): Promise<OperationResult<UserData>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    // Check the response status code
    if (response.status === 201) {
      const userData: UserData = {
        firstName,
        lastName,
        email,
      };
      return {
        result: true,
        data: userData,
      };
    } else {
      throw new Error('Registration failed');
    }
  } catch (error: any) {
    let errorMessage = 'An unexpected error occurred';
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }
    console.error(errorMessage);
    return {
      result: false,
      data: {} as UserData,
      error: errorMessage,
    };
  }
};

const userIsLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return !!token; // If token exists, the user is logged in
  } catch (error) {
    console.error('Error fetching token:', error);
    return false;
  }
};

const userLogOut = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

const getUserInfo = async (userEmail: string): Promise<UserData> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/profile/${userEmail}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user information');
  }
};

export {userLogin, userRegister, userIsLoggedIn, userLogOut, getUserInfo};
