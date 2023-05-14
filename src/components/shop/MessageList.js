import React, { Component } from "react";
import logo from '../../logo.png'
import { MomoAuthService } from "../auth/MomoAuthService";
import { handleCase } from "../../utils/case";

export class MessageList extends Component{
    render(){
        const authService = new MomoAuthService();
        if (this.props.messages === null || this.props.messages.length === 0){
            return <h5 className="p-2">No Messages</h5>
        }
        return this.props.messages.map(message =>
                <div className="bg-white mt-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto" key={ message.messageId }>
                    <div className="px-5 pb-5 mr-2 py-5">
                        <div className="flex items-center flex-row lg:flex-row md:flex-row justify-between mb-2">
                            <span className="text-xl italic font-semibold tracking-tight text-gray-900 border-dashed p-2 rounded-lg dark:text-white" style={{ fontFamily: 'Roboto'}}>{ message.momocadId  }</span>
                            <h3 className="text-2xl italic mr-3 font-bold text-gray-900 dark:text-white" style={{color: `${message.category.colour}`}}>{message.category.amount}</h3>
                        </div>
                            <hr className="border-gray-200 border-dashed sm:mx-auto dark:border-gray-700 lg:my-1  mt-2 mb-2 md:mt-1 md:mb-1 lg:mt-1 lg:mb-1" /> 
                        <div className="flex items-center flex-col lg:flex-row md:flex-row justify-between">
                            <h5 className="text-xl text-justify  tracking-tight text-gray-900 dark:text-white">{ (message.body.trim()).toLowerCase().charAt(0).toUpperCase() + (message.body.trim()).substring(1, message.body.length).toLowerCase() }</h5>
                            <button type="button"  className="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{float: "right", backgroundColor: `${ message.category.colour }`}} onClick={ () => authService.isUserLoggedIn() ? this.props.addToCart(message): this.props.handleLoginModal()}>Send</button>
                        </div>
                    </div>
                </div>

            )
    }
}