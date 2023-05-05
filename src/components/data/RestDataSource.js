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
        const payload = {
            from: 'MOMOCAD',
            to: receipientNumber,
            body: data.message.body// + '\n. ___ **FROM: ' + phoneNumber
        }
        const res = this.SendRequest('post', RestUrls[dataType], payload);
        authService.clearReciepientNumber();
        return res;
    }
}
