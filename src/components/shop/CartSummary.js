import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { MomoAuthService } from "../auth/MomoAuthService";

export class CartSummary extends Component {
    
    getSummary = () => {
        const authService = new MomoAuthService();
        const message = authService.getMomocad();
        if (((message !== null || message !== undefined || message !== '') && Object.keys(message).length > 0) || this.props.cartItems > 0){
            return <span>
                { Object.keys(message).length || this.props.cartItems } item(s) <span> </span>
                
                { message ? Number(message[Object.keys(message)[0]].category.amount).toFixed(2) : Number(this.props.cartPrice).toFixed(2) }
            </span>
        } else {
            return <span>Your cart: (empty)</span>
        }
    }

    getLinkClasses = () => {
        return ` text-red ${this.props.cartItems === 0 ? 'disabled':''}`;
    }
    handleCartUrl = (authMethod) => {
        const url = authMethod === 'email' ? '/momocad/shop/cart': '/momocad/shop/momo-user-cart';
        return <Link className={this.getLinkClasses()} to={ url }>
                        <span> </span> <i className="fa fa-shopping-cart"></i>
                     </Link>
    }
    render(){
        const authService = new MomoAuthService();
        return (
            <div style={{ display: this.props.display }}>
                <small>
                    { this.getSummary() }
                    {
                        authService.isUserLoggedIn() ?  this.handleCartUrl(authService.getAuthMethod()): <Link className={this.getLinkClasses()} to="/momocad/shop/messages">
                        <span> </span> <i className="fa fa-shopping-cart"></i>
                     </Link>
                    }
                </small>
            </div>
        )
    }
}