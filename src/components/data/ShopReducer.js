import { ActionTypes, DataTypes } from "./Types";

export const ShopReducer = (storeData, action) => {
    switch(action.type){
        case ActionTypes.DATA_LOAD:
            return {
                storeData,
                [action.payload.dataType]: action.payload.data
            };
        case ActionTypes.DATA_STORE:
            if (action.payload.dataType === DataTypes.ORDERS){
                return {
                    ...storeData, order: action.payload.data
                }
            }
            break;
        default: 
            return storeData || {}
    }
}