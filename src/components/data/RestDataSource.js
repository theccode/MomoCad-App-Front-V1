import Axios from "axios";
import { RestUrls } from "./Urls";
import { MomoAuthService } from "../auth/MomoAuthService";

export class RestDataSource {
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
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
            primaryCallbackUrl: RestUrls['CALLBACKURL'],
            description: transactionDetails.description,
            clientReference: `${this.uuidv4()}`.substring(0, 20)
        }
        console.log(payload);
        // return;
        this.SendRequest('post', RestUrls[dataType], payload)
    };
    PayRecipient = (dataType, data) => {
        const authService = new MomoAuthService();
        const userDetails = authService.getUserDetails();
        const transactionDetails = authService.getTransactionDetails();

        const payload = {
            recipientName: 'any',
            recipientMsisdn: authService.getRecipientNumber(),
            customerEmail: userDetails.customerEmail,
            channel: transactionDetails.channel,
            amount: transactionDetails.sendingAmount,
            primaryCallbackUrl: RestUrls['CALLBACKURL'],
            description: transactionDetails.description,
            clientReference: `${this.uuidv4()}`.substring(0, 20)
        }
        console.log(payload);
        // return;
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
        // return;
        const res = this.SendRequest('post', RestUrls[dataType], payload);
        authService.clearReciepientNumber();
        return res;
    }
}
