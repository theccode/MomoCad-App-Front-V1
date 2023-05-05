import Axios from "axios";
import { authUrl } from "../data/Urls";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const USER_AUTH_METHOD = 'authMethod';
export const RECIPIENT_NUMBER = 'recipientNumber';

export class MomoAuthService {
    executeBasicAuthenticationService(email = null, phoneNumber=null, password){
        const payload = {
            email: email,
            phoneNumber: phoneNumber,
            password: password
        }
        const options = {
            method: 'POST',
            url: authUrl,
            headers: {
                'content-type': 'application/json',
                'authorization': this.createBasicAuthToken(email || phoneNumber, password)
            },
            data: payload,
        };
        return Axios.request(options);
    }
    createBasicAuthToken = (username, password) => {
        return 'Basic '  + window.btoa(username+ ':' + password)
    }
    registerSuccessfulLogin (username, phoneNumber){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, [username, phoneNumber])
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, phoneNumber));
    }

    setAuthMethod(authMethod){
        sessionStorage.setItem(USER_AUTH_METHOD, authMethod);
    }

    setRecipientNumber(receipientNumber){
        sessionStorage.setItem(RECIPIENT_NUMBER, receipientNumber);
    }
    getRecipientNumber(){
        let number = sessionStorage.getItem(RECIPIENT_NUMBER);
        if (number == null){
            return '';
        }
        return number;
    }
    clearReciepientNumber(){
        sessionStorage.removeItem(RECIPIENT_NUMBER);
    }
    getAuthMethod(){
        let authMethod = sessionStorage.getItem(USER_AUTH_METHOD);
        if (authMethod == null){
            return '';
        }
        return authMethod;
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_AUTH_METHOD);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user == null){
            return false;
        }
        return true;
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user == null) return '';
        return user;
    }

    setupAxiosInterceptors(token){
        Axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()){
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }
}