import Axios from "axios";
import { authUrl } from "../data/Urls";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
export const USER_AUTH_METHOD = 'authMethod';
export const RECIPIENT_NUMBER = 'recipientNumber';
export const USERDETAILS = 'userDetails';
export const TRANSACTION_DETAILS = 'transactionDetails';
export const CLIENT_REFERENCE = 'clientReference';
export const MOMOCAD = 'momocad';

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

    setMomocad (momocad){
        sessionStorage.setItem(MOMOCAD, JSON.stringify(momocad));
    }
    getMomocad(){
        const momocad = JSON.parse(sessionStorage.getItem(MOMOCAD));
        if (momocad == null){
            return '';
        }
        return momocad;
    }
    removeMomocad(){
        sessionStorage.removeItem(MOMOCAD);
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
    setUserDetails(userDetails){
        const user_details = {
            customerName: userDetails.customerName,
            customerMsisdn: userDetails.customerMsisdn,
            customerEmail: userDetails.customerEmail
        }
        sessionStorage.setItem(USERDETAILS, JSON.stringify(user_details))
    }
    getUserDetails(){
        let userDetails = JSON.parse(sessionStorage.getItem(USERDETAILS));
        if (userDetails == null){
            return '';
        }
        return userDetails;
    }

    removeUserDetails(){
        sessionStorage.removeItem(USERDETAILS);
    }
    setTransactionDetails (transactionDetails) {
        const transDetails = {
            channel: transactionDetails.channel,
            receiverNetwork: transactionDetails.receiverNetwork,
            sendingAmount: transactionDetails.sendingAmount,
            receivingAmount: transactionDetails.receivingAmount,
            description: transactionDetails.description,
        }
        sessionStorage.setItem(TRANSACTION_DETAILS, JSON.stringify(transDetails))
    }
    getTransactionDetails(){
        let transactionDetails = JSON.parse(sessionStorage.getItem(TRANSACTION_DETAILS));
        if (transactionDetails == null){
            return '';
        }
        return transactionDetails;
    }
    removeTransaction(){
        sessionStorage.removeItem(TRANSACTION_DETAILS);
    }

    setClientReference (clientReference){
        sessionStorage.setItem(CLIENT_REFERENCE, JSON.stringify(clientReference));
    }
    getClientReference(){
        let clientReference = JSON.parse(sessionStorage.getItem(CLIENT_REFERENCE));
        if (clientReference == null){
            return ''
        }
        return clientReference;
    }
    removeClientReference(){
        sessionStorage.removeItem(CLIENT_REFERENCE);
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
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
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