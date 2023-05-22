import Axios from "axios";
import { RestUrls } from "./Urls";
import { MomoAuthService } from "../auth/MomoAuthService";

export class RestDataSource {
    
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    SendRequest =  (method, url, data) => Axios.request({ method, url, data });
    GetData = (dataType) => this.SendRequest('get', RestUrls[dataType]);
    RegisterUser =  (dataType, data) => this.SendRequest('post', RestUrls[dataType], data);
    LoginUser =  (dataType, data) => this.SendRequest('get', RestUrls[dataType], data);
    PayUs = (dataType, data) => {
        const authService = new MomoAuthService();
        const userDetails = authService.getUserDetails();
        const transactionDetails = authService.getTransactionDetails();
        

        const payload = {
            customerName: userDetails.customerName,
            customerMsisdn: userDetails.customerMsisdn,
            customerEmail: userDetails.customerEmail,
            channel: transactionDetails.channel,
            amount: transactionDetails.receivingAmount,
            primaryCallbackUrl: RestUrls.CALLBACK_URL,
            description: transactionDetails.description,
            clientReference: authService.getClientReference()
        }
        this.SendRequest('post', RestUrls[dataType], payload)
    };

    PayRecipient = (dataType, data) => {
        let i = 0;
        const authService = new MomoAuthService();
        const userDetails = authService.getUserDetails();
        const transactionDetails = authService.getTransactionDetails();
        const clientReference = `Pay10${Math.round(this.getRandomArbitrary(1, 1000000000))}`;

        const payload = {
            recipientName: authService.getRecipientNumber(),
            recipientMsisdn: authService.getRecipientNumber(),
            customerEmail: userDetails.customerEmail,
            channel: transactionDetails.receiverNetwork,
            amount: String((Number(transactionDetails.sendingAmount)).toFixed(2)),
            primaryCallbackUrl: RestUrls['PAY_CALLBACK_URL'],
            description: 'Withdrawal',
            clientReference: clientReference
        }
        console.log(transactionDetails);
        return;
        this.SendRequest('post', RestUrls[dataType], payload)
    };

    Checkout =  (dataType, data) => {
        const authService = new MomoAuthService();
        const phoneNumber = authService.getLoggedInUserName().split(',')[1];
        const receipientNumber = authService.getRecipientNumber();
        const formattedMessage = data.message.category.name + ': ' + data.message.body + '.' + ' MOMOCAD ID: ' + data.message.momocadId + ' is worth GHC ' + (Number(data.message.category.amount) - Number(data.message.category.charge)) + ' FROM: ' + phoneNumber+'. Visit https://www.mobilemoneycad.com to celebrate your loved ones.';
        const payload = {
            from: 'MOMOCAD',
            to: receipientNumber,
            body: formattedMessage
        }
        const res = this.SendRequest('post', RestUrls[dataType], payload);
        authService.clearReciepientNumber();
        return res;
    }
    FetchRate = (dataType) => this.SendRequest('get', RestUrls[dataType]);
}