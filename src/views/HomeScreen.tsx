import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../controllers/UserContext";
import { userLogOut } from "../controllers/AuthenticationController";

interface Props {
    navigation: StackNavigationProp<any>;
  }
  
const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const userContext = useUser();
    let lastTriggerTimestamp = 0;
    const RATE_LIMIT_TIME = 1000;

    useEffect(() => {
        if (userContext.user === null) {
            navigation.navigate("Login");
        }
    }, [userContext.user]);

    
    const handleLogOut = async () => {
        const currentTime = Date.now();
        if (currentTime - lastTriggerTimestamp >= RATE_LIMIT_TIME) {
            lastTriggerTimestamp = currentTime;
            await userLogOut();
            userContext.setUser(null);
        }
    }

    return (
        <SafeAreaView>
        <View>
            <Text>Hello {userContext.user?.firstName} {userContext.user?.lastName}</Text>
            <TouchableOpacity onPress={handleLogOut}><Text>Log Out</Text></TouchableOpacity>
        </View>
        </SafeAreaView>
    );
};

export default HomeScreen;