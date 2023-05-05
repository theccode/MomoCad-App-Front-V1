import { RestDataSource } from "./RestDataSource";
import { ActionTypes, DataTypes } from "./Types";
// import { data as phData } from './placeholderData';

const dataSource = new RestDataSource();

export const loadData = (dataType) => ({
    type: ActionTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType).then(response => ({dataType, data: response.data}))
})

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: dataSource.RegisterUser(DataTypes.USERS, user).then(response => ({dataType: DataTypes.USERS, data: response.data}))
})

export const login = (user) =>({
    type: ActionTypes.LOGIN_USER,
    payload: dataSource.LoginUser(DataTypes.LOGIN, user).then(response => ({dataType: DataTypes.LOGIN, data: response.data}))
})
export const placeOrder =  (order) =>({
    type: ActionTypes.DATA_STORE,
    payload: dataSource.StoreData(DataTypes.ORDERS, order).then(response =>({
        dataType: DataTypes.ORDERS, data: response.data
    }))
})
export const checkout =  (params) =>({
    type: ActionTypes.CHECKOUT_USER,
    payload: dataSource.Checkout(DataTypes.CHECKOUT, params).then(response =>({
        dataType: DataTypes.CHECKOUT, data: response.data
    })).catch((error) => {
        console.log(error);
      })
})