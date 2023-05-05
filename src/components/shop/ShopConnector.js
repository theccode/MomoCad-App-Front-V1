import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Shop } from "./Shop";
import { loadData, placeOrder, addUser, checkout, login } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { addToCart, updateCartQuantity, removeFromCart, clearCart } from '../data/CartActionCreators';
import { CartDetails } from "./CartDetails";
import { Checkout } from "./Checkout";
import { Thanks } from "./Thanks";
import { PhoneCartDetails } from "./phone/PhoneCartDetails";


const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart, placeOrder, addUser, checkout
}

const filterMessages = (messages = [], category) => (
    !category || category === 'All'
) ? messages : messages.filter(m => m.category.name.toLowerCase() === category.toLowerCase());

export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(class extends Component{
  
    render(){
        return <Switch>
            <Route path="/momocad/shop/messages/:category?"
                render={ (routeProps) => {
                    return (
                <Shop  { 
                    ...{ ...this.props.storeData, ...this.props}  } 
                    { ...routeProps } 
                    messages={ filterMessages(this.props.messages, routeProps.match.params.category) } 
                />
                )}
                }
            />
            <Route path="/momocad/shop/cart" 
                render={ (routeProps) => <CartDetails { ...this.props } {...routeProps} /> } />
            <Route path="/momocad/shop/momo-user-cart" render={ (routeProps) => <PhoneCartDetails { ...this.props } { ...routeProps } />} />
            {/* <Route path='/momocad/checkout' render={ routeProps => <Checkout { ...this.props } { ...routeProps } /> } /> */}
            <Route path='/momocad/thanks' render={ routeProps => <Thanks { ...this.props } { ...routeProps } /> } />
            <Redirect to="/momocad/shop/messages" />
        </Switch>
    }
    
    componentDidMount(){
        this.props.loadData(DataTypes.CATEGORIES);
        this.props.loadData(DataTypes.MESSAGES);
    }
})