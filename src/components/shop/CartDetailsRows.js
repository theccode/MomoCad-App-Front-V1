import { message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { Component, Fragment } from "react";
import { MomoAuthService } from "../auth/MomoAuthService";

export class CartDetailsRows extends Component{
    
    handleChange = (message, event) => {
        this.props.updateQuantity(message, Number(event.target.value));
    }

    getUserPhone = (userDetail) => {
        return userDetail.split(',')[0]
    }

    handleUserInput = (receipientNumber, authService) => {
        const userDetails = [authService.getLoggedInUserName()];
        userDetails.push(receipientNumber);
        authService.registerSuccessfulLogin(userDetails)
    }
    render(){
        const authService = new MomoAuthService();
        const errors = {};
        const values = []
        if(!this.props.cart || this.props.cart.length === 0){
            return <tr>
                <td colSpan="2">Your cart is empty!</td>
            </tr>
        } else {
            return <Fragment>
                {
                    this.props.cart.map(item => ( <Fragment key={item.message.messageId} > 
                            
                            <tr className="border-b  dark:bg-gray-800  dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2 mr-4">Sender's Email: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="sender-id" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full  p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. john@mobilemoneycad.com" value={this.getUserPhone(authService.getLoggedInUserName())} disabled/></td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2 ">Recieving Bank Account Number: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="receiving-bank-account" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. 14000083816388" value="" disabled/></td>
                            </tr>
                            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">Recieving Bank: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="receiving-bank" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. Ecobank Ghana PLC" value="" disabled/></td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">VISA/MASTER Card: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="card-number" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. **** **** ***** *****" /></td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">Card Holder: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="card-holder-name" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. John Doe" /></td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">Expiry Date: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="card-expiry-date" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. 02/30" /></td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">CCV: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="card-ccv" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. 821"  /></td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">MomoCad ID: </td>
                                <td colspan={3} className="px-3 py-2">
                                    <input type="text" id="momocad-id" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" defaultValue={item.message.momocadId} placeholder="e.g 01FCDASKJ" disabled/>
                                </td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={4} className="px-3 py-2" >
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={item.message.body} placeholder="Message..."></textarea>
                                </td>
                            </tr>
                            <tr className=" border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">CAD Amount: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="cad-amount" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" defaultValue={Number(item.message.category.amount).toFixed(2)} placeholder="Amount" disabled required/></td>
                            </tr>
                            <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1}  className="px-3 py-2">Total Amount: </td>
                                <td colSpan={3} className="px-3 py-2"><input type="text" id="cad-amount" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full  p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" value={ (Number(item.quantity) * Number(item.message.category.amount)).toFixed(2)} placeholder="Total Amount" disabled required/></td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="px-1 py-1">
                                    <p className="text-justify text-white p-2">By buying this momoCAD, recipient is credited with an amount of <span style={{color: `${item.message.category.colour}`, fontWeight: 'bold'}}>${item.message.category.amount - item.message.category.charge}</span> into their  bank account.</p>
                                </td>
                            </tr>
                            <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={4} className="px-3 py-2 text-center">
                                    <button type="button" className="focus:outline-none text-white focus:bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={ () => this.props.removeFromCart(item.message) }>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                            <tr className="text-right  dark:border-gray-700">
                                <td colSpan={4} className="px-3 py-2">
                                <hr className="my-6 border-gray-200 border-dashed sm:mx-auto dark:border-gray-700 lg:my-8 text-center" />
                                </td>
                            </tr>
                            
                        </Fragment>
                        )
                    )
                }
                <tr>
                    <td className="px-3 py-2 text-right" colSpan="3">Sub Total: </td>
                    <td className="px-3 py-2" colSpan="3">{Number(this.props.cartPrice).toFixed(2)} </td>
                </tr>
               
            </Fragment>
        }
    }
}