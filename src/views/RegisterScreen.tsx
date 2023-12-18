/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  emailIsValid,
  nameIsValid,
  passwordIsValid,
  UserData,
} from '../models/UserModel';
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
import {userRegister} from '../controllers/AuthenticationController';
import {GRAY} from '../styles/Colors';
import {useUser} from '../controllers/UserContext';

interface Props {
  navigation: StackNavigationProp<any>;
}
const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const[firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const[lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const[emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const[passError, setPassError] = useState('');
  let lastTriggerTimestamp = 0;
  const RATE_LIMIT_TIME = 1000;
  const userContext = useUser();


  const validateFirstNameInput = () => {
    if (firstName.trim() === '') {
      setFirstNameError('Please enter some text.');
      return false;
    }
    setFirstNameError('');
    return true;
  };

  const validateLastNameInput = () => {
    if (lastName.trim() === '') {
      setLastNameError('Please enter some text.');
      return false;
    }
    setLastNameError('');
    return true;
  };

  const validateEmailInput = () => {
    if (email.trim() === '') {
      setEmailError('Please enter some text.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassInput = () => {
    if (password.trim() === '') {
      setPassError('Please enter some text.');
      return false;
    }
    setPassError('');
    return true;
  };

  const handleSignUp = async () => {
    console.log('handleSignUp Working');
    const currentTime = Date.now();
    if (currentTime - lastTriggerTimestamp >= RATE_LIMIT_TIME) {
      lastTriggerTimestamp = currentTime;

      if (validateFirstNameInput()) {
        setFirstNameError('');
      }else{
        return;
      }
      if (validateLastNameInput()) {
        setLastNameError('');
      }else{
        return;
      }

      if (validateEmailInput()) {
        setEmailError('');
      }else{
        return;
      }

      if (validatePassInput()) {
        setPassError('');
      }else{
        return;
      }


      if (!nameIsValid(firstName) || !nameIsValid(lastName)) {
        Alert.alert('Please enter a valid name (without invalid characters)');
        return;
      }
      if (!emailIsValid(email)) {
        Alert.alert('Please enter a valid email address.');
        return;
      }
      if (!passwordIsValid(password)) {
        Alert.alert(
          'Password must be at least 6 characters and only consist of alphanumeric characters and the following characters: ~!@#$%^&*()_+',
        );
        return;
      }
      try {
        const result = await userRegister({
          firstName,
          lastName,
          email,
          password,
        });
        if (result.result && result.data) {
          userContext.setUser(result.data);
          Alert.alert('Success', 'Account created', [
            {text: 'OK', onPress: () => navigation.navigate('Home')},
          ]);
        } else {
          Alert.alert(
            'Registration failed',
            result.error || 'An unexpected error occurred',
          );
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Unexpected error');
      }
    }
  };

  const removeSelf = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputContainer}>
          
          <TextInput
            style={styles.input}
            placeholderTextColor={GRAY.s500}
            placeholder="First Name"
            onChangeText={(text: string) => setFirstName(text)}
          />
          {firstNameError ? <Text style={{color: 'red' }}>{firstNameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholderTextColor={GRAY.s500}
            placeholder="Last Name"
            onChangeText={(text: string) => setLastName(text)}
          />
          {lastNameError ? <Text style={{color: 'red' }}>{lastNameError}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholderTextColor={GRAY.s500}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(text: string) => setEmail(text)}
          />
          {emailError ? <Text style={{color: 'red' }}>{emailError}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholderTextColor={GRAY.s500}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="password"
            onChangeText={(text: string) => setPassword(text)}
          />
          {passError ? <Text style={{color: 'red' }}>{passError}</Text> : null}
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already Have an Account? </Text>
          <TouchableOpacity onPress={removeSelf}>
            <Text style={styles.signInLink}>Log In</Text>
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
  formContainer: {
    width: '85%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  signUpButton: {
    backgroundColor: '#007bff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    marginRight: 5,
  },
  signInLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
