import { OperationResult } from "./ResponseModel";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

//Return operation result with result = true & user data if login successful, otherwise return operation result with result = false (& appropriate error if possible)
const firebaseUserLogin = async (email: string, password: string) : Promise<OperationResult<UserData>> => {
    const userLogin = async (email: string, password: string) : Promise<FirebaseAuthTypes.UserCredential> => {

        const userCreds = await auth().signInWithEmailAndPassword(email, password);

        return userCreds;
    }
    const response: OperationResult<UserData> = {result: false};
    try {
        const result = await userLogin(email, password);

        if (result.user && result.user.email) {
            const userData = await firebaseGetUserInfo(email);
            response.data = userData;
            response.result = true;
        }else {
            response.error = "Login failed";
        }
    }catch (error) {
        //console.error(error);
        response.error = "Login failed";
    }
    return response;
}

//Return operation result with result = true if login successful (no user data, assuming user is not automatically logged in on success), otherwise return operation result with result = false (& appropriate error if possible)
const firebaseUserRegister = async ({firstName, lastName, email, password}: UserRegData) : Promise<OperationResult<UserData>> => {
    if (!nameIsValid(firstName) || !nameIsValid(lastName) || !emailIsValid(email) || !passwordIsValid(password)) {
        throw new Error("Invalid user info");
    }

    const userRegister = async (email: string, password: string) : Promise<FirebaseAuthTypes.UserCredential> => {
        const userCreds = await auth().createUserWithEmailAndPassword(email, password);
        return userCreds;
    }
    const response: OperationResult<UserData> = {result: false};
    try {
        const result = await userRegister(email, password);

        //If email is properly set then registration is successful
        if (result.user && result.user.email) {
            //Not checking for anything since user can log in just fine without personal info, can always add something to call set user info() later
            await firebaseSetUserInfo({email, firstName, lastName});
            response.result = true;
        }else {
            response.error = "Registration failed";
        }
    }catch (error) {
        //console.error(error);
        response.error = "Registration failed";
    }
    return response;
}

const firebaseGetUserInfo = async (email: string) : Promise<UserData> => {
    let firstName = "";
    let lastName = "";
    const doc = await firestore().collection("UserData").where("email", "==", email).get();

    if (!doc.empty) {
        //Not bothering to check since logically there shouldn't be more than one
        doc.forEach((item)=>{
            const userData = item.data();
            firstName = userData.firstName ? userData.firstName : "";
            lastName = userData.lastName ? userData.lastName : "";
        })
    }
    return {firstName: firstName, lastName: lastName, email: email};
}

const firebaseSetUserInfo = async ({email, firstName, lastName}: UserData) : Promise<boolean> => {
    try {
        await firestore().collection("UserData").add({ email, firstName, lastName });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const nameIsValid = (name: string) : boolean => {
    if (name.trim().length === 0) {
        return false;
    }
    return !humanNameBlacklistPattern.test(name);
}

const emailIsValid = (email: string) : boolean => {
    return emailRegex.test(email);
}

/*
Valid password is currently defined as
-alphanumeric characters, ~!@#$%^&*()_+
-at least 6 characters
*/
const passwordIsValid = (password: string) : boolean => {
    return passwordRegex.test(password);
}
export { firebaseUserLogin, firebaseUserRegister, nameIsValid, emailIsValid, passwordIsValid, firebaseGetUserInfo };
export type { UserData, UserRegData };
