import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CartDetailsRows } from "./CartDetailsRows";
import { MessageList } from "./MessageList";
import Marquee from "react-fast-marquee";
import Footer from "../Footer";
import { NavigationBar } from "../NavigationBar";
import { MomoAuthService } from "../auth/MomoAuthService";
import mastercard from '../../assets/mastercard.png';
import visa from '../../assets/visa.png';

export class CartDetails extends Component{
    handleCheckout = (cart) =>{
        this.props.history.push(`/momocad/thanks`)
        return cart[0];
    }
    handleAddToCart = (...args) => {
        this.props.addToCart(...args);
        this.props.history.push("/momocad/shop/cart");
    }
    getLinkClasses = ()=>`inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${this.props.cartItems === 0 ? 'disabled' : ''}
    `;

    render() {
        const authService = new MomoAuthService();
        return <>
        <NavigationBar {...this.props} display='none' />
            <div className="flex  justify-center items-center flex-col">
                <div className="flex flex-col items-center justify-center  mb-4">
                    <p className="text-2xl text-gray-400 mt-4 dark:text-gray-500">Kindly review your order details</p>
                    <div className="flex mt-2">
                        <span><img src={mastercard} width="120" height="120" /></span>
                        <span className="mt-2"><img src={visa} width="120" height="120" /></span>
                    </div>
                </div>
                <table className="shadow-xl m-2 border  border-gray-500 text-gray-500 dark:text-gray-400">
                    <tbody>
                        <CartDetailsRows 
                        cart={ this.props.cart } 
                        cartPrice={ this.props.cartPrice }
                        updateQuantity={ this.props.updateCartQuantity }
                        removeFromCart={ this.props.removeFromCart }
                        { ...this.props }
                        />
                    </tbody>
                </table>
                <div className="m-5">
                    <Link className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white mr-2" to="/momocad/shop/messages">Return to Shop</Link>
                    {/* <Link className={ this.getLinkClasses() } to="/momocad/checkout">SEND</Link> */}
                    <a className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white mr-2  focus:cursor-mouse" onClick={() => this.props.checkout(this.handleCheckout(this.props.cart))}>SEND</a>
                </div>
                {/* <Marquee className="container m-2">
                <div class="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 xxs:grid-cols-1 gap-4 m-1">
                    <MessageList { ...this.props } 
                    messages={ this.props.messages }
                    addToCart={ this.handleAddToCart }/>
                </div>
                </Marquee> */}
            </div>
            <Footer />
        </>
    }
}