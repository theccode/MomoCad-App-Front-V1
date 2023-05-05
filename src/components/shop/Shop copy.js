import React, { Component } from "react";
import { MessageList } from "./MessageList";
import { NavigationBar } from "../NavigationBar";
import { Jumbotron } from "../Jumbotron";
import Footer from "../Footer";

export class Shop extends Component{
    handleAddToCart = (...args) => {
        this.props.addToCart(...args);
        this.props.history.push("/momocad/shop/cart");
    }
    
    render(){
        return <div className="mx-auto bg-slate-900 justify-center body text-slate-100">
            <NavigationBar {...this.props} />
            <Jumbotron />
            <div className="grid grid-cols-[repeat(auto-fit,_16.666666%)] p-2 m-auto justify-center">
                <div class="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 xxs:grid-cols-1 gap-4">
                    <MessageList 
                    { ...this.props } 
                    messages={ this.props.messages }
                    addToCart={ this.handleAddToCart }
                />
                </div>               
            </div> 
            <Footer /> 
        </div>
    }
}