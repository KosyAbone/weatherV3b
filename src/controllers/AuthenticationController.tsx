import { OperationResult } from "../models/ResponseModel";
import { UserData, UserRegData, emailIsValid, firebaseGetUserInfo, firebaseUserLogin, firebaseUserRegister, passwordIsValid } from "../models/UserModel";
import auth from '@react-native-firebase/auth';

const genericError = {result: false, error: "An unexpected error occurred"};

const userLogin = async (email: string, password: string) : Promise<OperationResult<UserData>> => {
    try {
        return await firebaseUserLogin(email, password);
    }catch (e) {
        console.error(e);
        return genericError;
    }
}

const userRegister = async ({firstName, lastName, email, password}: UserRegData) => {
    try {
        return await firebaseUserRegister({firstName, lastName, email, password});
    }catch (e) {
        console.error(e);
        return genericError;
    }
}

const userIsLoggedIn = () => {
    const user = auth().currentUser;
    if (!user) {
        return false;
    }
    return true;
}

const userLogOut = async () => {
    await auth().signOut();
}

const getUserInfo = async (userEmail: string) => {
    return await firebaseGetUserInfo(userEmail);
}

export {userLogin, userRegister, userIsLoggedIn, userLogOut, getUserInfo};