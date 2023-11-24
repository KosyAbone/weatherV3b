import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { userLogin } from "../controllers/AuthenticationController";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useUser } from "../controllers/UserContext";

interface Props {
    navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useUser();

    useEffect(() => {
        if (userContext.user !== null) {
            navigation.navigate("Home");
        }
    }, [userContext.user, navigation]);

    const handleLogin = () => {

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
    };

    const handleSignUp = () => {
        console.log("Signing up");
        navigation.push("Sign Up");
    }


    return (
        <SafeAreaView>
            <View>
                <View>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#767676"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
                <TextInput
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor="#767676"
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