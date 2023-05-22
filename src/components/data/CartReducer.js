import { ActionTypes } from "./Types";

export const CartReducer = (storeData, action) => {
    let newStore = { cart:[], cartItems: 0, cartPrice: 0, ...storeData};
    
    switch(action.type){
        case ActionTypes.CART_ADD:
            const m = action.payload.message;
            const q = action.payload.quantity;

            let existing = newStore.cart.find(item =>  item.message.messageId === m.messageId);

            if (existing){
                // existing.quantity += q;
                existing.quantity = q;
            } else { 
                // newStore.cart = [...newStore.cart, action.payload];
                newStore.cart = [action.payload];
            }
            // newStore.cartItems += q;
            newStore.cartItems = q;
            // newStore.cartPrice += m.category.amount * q;
            newStore.cartPrice = m.message.category.amount * q;
            return newStore;
        case ActionTypes.CART_UPDATE:
            newStore.cart = newStore.cart.map(item => {
                if (item.message.messageId === action.payload.message.messageId){
                    const diff = action.payload.quantity - item.quantity;
                    // newStore.cartItems += diff;
                    newStore.cartItems = diff;
                    // newStore.cartPrice += (Number(item.message.amount) * Number(diff));
                    newStore.cartPrice = (Number(item.message.amount) * Number(diff));
                    return action.payload;
                } else {
                    return item;
                }
            });
            return newStore;

        case ActionTypes.CART_REMOVE:
            let selection = newStore.cart.find(item => item.message.messageId === action.payload.messageId);
            newStore.cartItems -= selection.quantity;
            newStore.cartPrice -= selection.quantity * selection.message.amount;
            newStore.cart = newStore.cart.filter(item => item !== selection);
            return newStore;
        
        case ActionTypes.CART_CLEAR:
            return { ...storeData, cart: [], cartItems: 0, cartPrice: 0}
        default:
            return storeData || {};
    }

}