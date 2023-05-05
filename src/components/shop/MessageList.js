import React, { Component } from "react";
import logo from '../../logo.png'
import { MomoAuthService } from "../auth/MomoAuthService";

export class MessageList extends Component{
    render(){
        const authService = new MomoAuthService();
        if (this.props.messages === null || this.props.messages.length === 0){
            return <h5 className="p-2">No Messages</h5>
        }
        return this.props.messages.map(message =>
                <div className="bg-white mt-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto" key={ message.messageId }>
                    <div className="px-5 pb-5 mr-2 py-5">
                        <a href="#" className="">
                            <span className="text-xl italic font-semibold tracking-tight text-gray-900 dark:text-white">{ message.momocadId  }</span>
                            <span className="text-xl italic ml-4 font-bold text-gray-900 dark:text-white" style={{color: `${message.category.colour}`}}>{message.category.amount}</span>
                        </a>
                        <div className="flex items-center justify-between">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{ message.body  }</h5>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{float: "right", backgroundColor: `${ message.category.colour }`}} onClick={ () => authService.isUserLoggedIn() ? this.props.addToCart(message): this.props.handleLoginModal()}>Send</a>
                        </div>
                    </div>
                </div>

            )
    }
}