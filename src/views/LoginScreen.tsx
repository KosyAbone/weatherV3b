import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { getUserInfo, userLogin } from "../controllers/AuthenticationController";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../controllers/UserContext";
import { GRAY } from "../styles/Colors";
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from "@react-navigation/native";

interface Props {
    navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useUser();
    const [initializing, setInitializing] = useState(true);
    let lastTriggerTimestamp = 0;
    const RATE_LIMIT_TIME = 1000;

    async function onAuthStateChanged(user: any) {
        if (user && user.email) {
            const userData = await getUserInfo(user.email);
            userContext.setUser(userData);
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

    //Clear text when user navigates into this screen (Target UX is actually just "clear on exit" but seems difficult to implement on a stack navigator, using an alternative that "should" feel the same)
    useFocusEffect(
        React.useCallback(()=>{
            setEmail("");
            setPassword("");
        },[])
    );

    useEffect(() => {
        if (userContext.user !== null) {
            navigation.navigate("Home");
        }
    }, [userContext.user]);

    const handleLogin = () => {
        const currentTime = Date.now();
        if (currentTime - lastTriggerTimestamp >= RATE_LIMIT_TIME) {
            lastTriggerTimestamp = currentTime;
            //firebase implementation takes empty string and throws so an additional check here
            if (email.length === 0 || password.length === 0) {
                const error = 'Invalid credentials. Please try again.';
                Alert.alert(error);
                return;
            }
            userLogin(email, password).then(result=>{
            if (result.result === true && result.data) {
                userContext.setUser(result.data);
            } else {
                const error = 'Invalid credentials. Please try again.';
                Alert.alert(error);
            }
            }).catch(e=>{
            console.error(e);
            Alert.alert("Unexpected error");
            });
        }

    };

    const handleSignUp = () => {
        console.log("Signing up");
        navigation.navigate("Sign Up");
    }

    if (initializing) return null;

    return (
        <SafeAreaView>
            <View>
                <View>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={GRAY.s500}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <TextInput
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor={GRAY.s500}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity onPress={handleLogin}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSignUp}>
                <Text>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>);
};

export default LoginScreen;