import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../controllers/UserContext";

interface Props {
    navigation: StackNavigationProp<any>;
  }
  
const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const userContext = useUser();

    useEffect(() => {
        if (userContext.user === null) {
            navigation.navigate("Login");
        }
    }, [userContext.user, navigation]);

    const handleLogOut = () => {
        userContext.setUser(null);
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