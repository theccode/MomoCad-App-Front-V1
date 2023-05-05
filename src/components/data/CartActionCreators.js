import { ActionTypes } from "./Types";

export const addToCart = (message, quantity) => ({
    type: ActionTypes.CART_ADD,
    payload: {
        message,
        quantity: quantity || 1
    }
});

export const updateCartQuantity = (message, quantity) => ({
    type: ActionTypes.CART_UPDATE,
    payload: {message, quantity}
})

export const removeFromCart = (message) => ({
    type: ActionTypes.CART_REMOVE,
    payload: message
})

export const clearCart = () => ({
    type: ActionTypes.CART_CLEAR
})