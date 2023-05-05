import React, { Component } from 'react';
import { ValidatedForm } from "../../forms/ValidatedForm";
import { NavigationBar } from '../NavigationBar';
import Footer from '../Footer';

export class Checkout extends Component {
    constructor(props){
        super(props);
        this.defaultAttrs = { type: 'text', required: true };
        this.formModel = [
            { label: 'Sender\'s ID' },
            { label: 'Recipient\'s ID', attrs: { type: 'tel' }},
            { label: 'Confirm Recipient\'s ID' },
            { label: 'Receiver\'s Network'}
        ]
    }

    handleSubmit = (formData) => {
        const order = { ...formData, messages: this.props.cart.map(item =>
            ({ quantity: item.quantity, message_id: item.message.messageId})
            )}
            this.props.placeOrder(order);
            this.props.clearCart();
            this.props.history.push('/momocad/thanks');
    }

    handleCancel = () => {
        this.props.history.push('/momocad/shop/cart');
    }

    render(){
        return <>
            <NavigationBar { ...this.props } />
            <form>
                 <div class=" container grid gap-6 mb-6 md:grid-cols-2 mx-auto">
                    <ValidatedForm 
                    formModel={ this.formModel }
                    defaultAttrs={ this.defaultAttrs }
                    submitCallback={ this.handleSubmit }
                    cancelCallback={ this.handleCancel }
                    submitText='Place Order'
                    cancelText='Return to Cart' />
                </div>
            </form>
            <Footer />
        </>
    }
}