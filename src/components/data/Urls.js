import { DataTypes } from "./Types";

// const hostname = "165.227.175.62";
/***************www.mobilemoneycad.com***************/
/* *************** SECURED URL SETTINGS ******** */
// const protocol = "https";
// const hostname = "www.mobilemoneycad.com";
// const port = 443;
const CALLBACK_URL = 'CALLBACK_URL';
const SEND_CALLBACK_URL = 'SEND_CALLBACK_URL';
const PAY_CALLBACK_URL = 'PAY_CALLBACK_URL';
const SOCKET_URL = 'SOCKET_URL';
/* ***************LOCAL**************** */
const hostname = "127.0.0.1";
const protocol = "http";
const port = 8080;

export const RestUrls = {
    [DataTypes.MESSAGES]: `${protocol}://${hostname}:${port}/api/shop/messages`,
    [DataTypes.CATEGORIES]:`${protocol}://${hostname}:${port}/api/shop/category`,
    [DataTypes.SUBCATEGORIES]:`${protocol}://${hostname}:${port}/api/subcategory`,
    [DataTypes.ORDERS]:`${protocol}://${hostname}:${port}/api/shop/orders/new`,
    [DataTypes.ORDERSBYUSER]:`${protocol}://${hostname}:${port}/api/shop/user/orders`,
    [DataTypes.USERS]:`${protocol}://${hostname}:${port}/api/shop/register`,
    [DataTypes.LOGIN]:`${protocol}://${hostname}:${port}/api/shop/auth`,
    [DataTypes.CHECKOUT]:`${protocol}://${hostname}:${port}/api/shop/send-sms`,
    [DataTypes.RECEIVEMONEY]:`${protocol}://${hostname}:${port}/api/shop/receive-momo`,
    [DataTypes.SENDMONEY]:`${protocol}://${hostname}:${port}/api/shop/send-momo`,
    [DataTypes.FETCHRATE]:`${protocol}://${hostname}:${port}/api/shop/rate`,
    [CALLBACK_URL]:`${protocol}://${hostname}:${port}/api/shop/receive-momo/res`,
    [SEND_CALLBACK_URL]:`${protocol}://${hostname}:${port}/api/shop/send-momo/res`,
    [SOCKET_URL]:`${protocol}://${hostname}:${port}/ws`,
    // [SOCKET_URL]:`${protocol}://${hostname}:${port}/ws`,
    // [DataTypes.SENDMONEY]:`${protocol}://${hostname}:${port}/api/momocad/send-momo/res`,
};

export const authUrl = `${protocol}://${hostname}:${port}/api/shop/auth`;