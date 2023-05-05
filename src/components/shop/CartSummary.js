import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { MomoAuthService } from "../auth/MomoAuthService";

export class CartSummary extends Component {
    getSummary = () => {
        if (this.props.cartItems > 0){
            return <span>
                { this.props.cartItems } item(s) <span> </span>
                { Number(this.props.cartPrice).toFixed(2) }
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