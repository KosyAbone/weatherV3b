import { OperationResult } from "../models/ResponseModel";
import { UserData, UserRegData, emailIsValid, firebaseUserLogin, firebaseUserRegister, passwordIsValid } from "../models/UserModel";

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

export {userLogin, userRegister};