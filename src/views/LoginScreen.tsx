/* eslint-disable react-hooks/exhaustive-deps */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  userLogin,
  getUserInfo,
  userIsLoggedIn,
} from '../controllers/AuthenticationController';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {useUser} from '../controllers/UserContext';
import {GRAY} from '../styles/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {UserData} from '../models/UserModel';

interface Props {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useUser();
  const [initializing, setInitializing] = useState(true);
  let lastTriggerTimestamp = 0;
  const RATE_LIMIT_TIME = 1000;

  useEffect(() => {
    async function checkLoggedInStatus() {
      const isLoggedIn = await userIsLoggedIn();
      if (isLoggedIn) {
        const userData = await getUserInfo(email); // Replace 'email' with the logged-in user's email or an identifier
        userContext.setUser(userData);
      }
      setInitializing(false);
    }

    checkLoggedInStatus();
  }, []);

  //Clear text when user navigates into this screen (Target UX is actually just "clear on exit" but seems difficult to implement on a stack navigator, using an alternative that "should" feel the same)
  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
    }, []),
  );

  useEffect(() => {
    if (userContext.user !== null) {
      navigation.navigate('Home');
    }
  }, [userContext.user]);

  const handleLogin = async () => {
    const currentTime = Date.now();
    if (currentTime - lastTriggerTimestamp >= RATE_LIMIT_TIME) {
      lastTriggerTimestamp = currentTime;
      if (email.length === 0 || password.length === 0) {
        const error = 'Please fill all the fields.';
        Alert.alert(error);
        return;
      }
      try {
        const result = await userLogin(email, password);
        if (result.result && result.data) {
          const userInfo = await getUserInfo(result.data.email);

          const userData: UserData = {
            email: result.data.email,
            token: result.data.token || '',
            firstName: userInfo.firstName || '',
            lastName: userInfo.lastName || '',
          };
          Alert.alert('Login successful');
          userContext.setUser(userData);
        } else {
          Alert.alert(
            'Login failed',
            result.error || 'An unexpected error occurred',
          );
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Unexpected error');
      }
    }
  };

  const handleSignUp = () => {
    console.log('Signing up');
    navigation.navigate('Sign Up');
  };

  if (initializing) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/logoImage.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={GRAY.s500}
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor={GRAY.s500}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    // Adjust dimensions as per your logo's aspect ratio
  },
  formContainer: {
    flex: 1,
    width: '85%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  signInButton: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    marginRight: 5,
  },
  signUpLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
