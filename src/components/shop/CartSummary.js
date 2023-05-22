import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { MomoAuthService } from "../auth/MomoAuthService";

export class CartSummary extends Component {
    
    getSummary = () => {
        const authService = new MomoAuthService();
        const message = authService.getMomocad();
        if (Object.keys(message).length > 0){
            return <span>
                { Object.keys(message).length } item(s) <span> </span>
                { Number(message[Object.keys(message)[0]].category.amount).toFixed(2) }
            </span>
        } else {
            return <span>Your cart: (empty)</span>
        }
    }

    getLinkClasses = () => {
        return ` text-red ${this.props.cartItems === 0 ? 'disabled':''}`;
    }
    render(){
        const authService = new MomoAuthService();
        return (
            <div className="">
                <small>
                    { this.getSummary() }
                    {
                        authService.isUserLoggedIn() ? <Link className={this.getLinkClasses()} to="/momocad/shop/cart">
                        <span> </span> <i className="fa fa-shopping-cart"></i>
                     </Link> : <Link className={this.getLinkClasses()} to="/momocad/shop/messages">
                        <span> </span> <i className="fa fa-shopping-cart"></i>
                     </Link>
                    }
                </small>
            </div>
        )
    }
}