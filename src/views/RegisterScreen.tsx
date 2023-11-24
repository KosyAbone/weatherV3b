import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { emailIsValid, nameIsValid, passwordIsValid } from "../models/UserModel";
import { Alert, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { userRegister } from "../controllers/AuthenticationController";
import { GRAY } from "../styles/Colors";

interface Props {
    navigation: StackNavigationProp<any>;
}
const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        if (!nameIsValid(firstName) || !nameIsValid(lastName)) {
            Alert.alert("Please enter a valid name (without invalid characters)");
            return;
        }
        if (!emailIsValid(email)) {
            Alert.alert("Please enter a valid email address.");
            return;
        }
        if (!passwordIsValid(password)) {
            Alert.alert("Password must be at least 6 characters and only consist of alphanumeric characters and the following characters: ~!@#$%^&*()_+");
            return;
        }
        userRegister({firstName, lastName, email, password}).then(result=>{
            if (result.result === true) {
                Alert.alert(
                    'Success',
                    'Account created',
                    [
                      { text: 'OK', onPress: () => 
                      navigation.goBack() },
                    ]
                );
            }else {

            }
        }).catch(e=>{
            console.error(e);
            Alert.alert("Unexpected error");
        });
    }

    const removeSelf = () => {
        navigation.goBack();
    }


    return (
        <SafeAreaView>
            
        <View>

            <Text>Create an Account</Text>
            <View>
                <TextInput placeholderTextColor={GRAY.s500} placeholder="Firstname" onChangeText={(text: string) => setFirstName(text)}/>
                <TextInput placeholderTextColor={GRAY.s500} placeholder="Lastname" onChangeText={(text: string) => setLastName(text)}/>
                <TextInput placeholderTextColor={GRAY.s500} keyboardType="email-address" textContentType="emailAddress" placeholder="Email" onChangeText={(text: string) => setEmail(text)}/>
                <TextInput placeholderTextColor={GRAY.s500} secureTextEntry={true} autoCapitalize="none" autoCorrect={false} placeholder="password" onChangeText={(text: string) => setPassword(text)}/>
            </View>
                <View>
                <View><Pressable onPress={handleSignUp}><Text>Sign Up</Text></Pressable></View>
                <View>
                    <Text>Already Have an Account? <TouchableOpacity onPress={removeSelf} ><Text>Log In</Text></TouchableOpacity></Text>
                </View>
                </View>
        </View>

        </SafeAreaView>
    )
}

export default RegisterScreen;