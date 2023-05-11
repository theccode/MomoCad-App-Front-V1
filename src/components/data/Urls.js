import { DataTypes } from "./Types";

// const hostname = "165.227.175.62";
/***************www.mobilemoneycad.com***************/
const protocol = "https";
const hostname = "www.mobilemoneycad.com";
const port = 443;
/* ***************LOCAL**************** */
// const hostname = "127.0.0.1";
// const protocol = "http";
// const port = 8080;

export const RestUrls = {
    [DataTypes.MESSAGES]: `${protocol}://${hostname}:${port}/api/shop/messages`,
    [DataTypes.CATEGORIES]:`${protocol}://${hostname}:${port}/api/shop/category`,
    [DataTypes.SUBCATEGORIES]:`${protocol}://${hostname}:${port}/api/subcategory`,
    [DataTypes.ORDERS]:`${protocol}://${hostname}:${port}/api/shop/orders`,
    [DataTypes.USERS]:`${protocol}://${hostname}:${port}/api/shop/register`,
    [DataTypes.LOGIN]:`${protocol}://${hostname}:${port}/api/shop/auth`,
    [DataTypes.CHECKOUT]:`${protocol}://${hostname}:${port}/api/shop/hubtel/sms`
};

export const authUrl = `${protocol}://${hostname}:${port}/api/shop/auth`;