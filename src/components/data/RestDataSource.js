import Axios from "axios";
import { RestUrls } from "./Urls";
import { MomoAuthService } from "../auth/MomoAuthService";

export class RestDataSource {
    SendRequest =  (method, url, data) => Axios.request({ method, url, data });
    GetData = (dataType) => this.SendRequest('get', RestUrls[dataType]);
    RegisterUser =  (dataType, data) => this.SendRequest('post', RestUrls[dataType], data);
    LoginUser =  (dataType, data) => this.SendRequest('get', RestUrls[dataType], data);
    Checkout =  (dataType, data) => {
        const authService = new MomoAuthService();
        const phoneNumber = authService.getLoggedInUserName().split(',')[1];
        const receipientNumber = authService.getRecipientNumber();
        console.log(data)
        console.log(data.message.category.name + ': ' + data.message.body + '.' +'\n' +'.............................\n' + 'MOMOCAD ID: ' + data.message.momocadId + ' is worth GHC ' + (Number(data.message.category.amount) - Number(data.message.category.charge)) + '\nFROM: ' + phoneNumber+'. Visit https://www.mobilemoneycad.com to celebrate your loved ones.');
        const formattedMessage = data.message.category.name + ': ' + data.message.body + '.' +' ............................. ' + ' MOMOCAD ID: ' + data.message.momocadId + ' is worth GHC ' + (Number(data.message.category.amount) - Number(data.message.category.charge)) + ' FROM: ' + phoneNumber+'. Visit https://www.mobilemoneycad.com to celebrate your loved ones.';
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
