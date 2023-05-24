import { message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { Component, Fragment, createRef } from "react";
import { MomoAuthService } from "../auth/MomoAuthService";

export class CartDetailsRows extends Component{
    state = {
        messageText: '',
        characterLimit: 160,
        textAreaLenth: 0
    }
    handleChangeOnMsg = e =>{
        this.setState({
        messageText: e.target.value
    })
    this.props.setMessageLength(e.target.value.length);
    this.props.setCharacterLimit(this.state.characterLimit);
    }
    getUserPhone = (userDetail) => {
        return userDetail.split(',')[0]
    }

    handleKeyPress = (e) => {
        if (this.state.messageText.length > this.state.characterLimit){
            e.preventDefault();
            e.stopPropagation();
        }
    }
    
    handleChange = (message, event) => {
        this.props.updateQuantity(message, Number(event.target.value));
    }

    handleUserInput = (e, authService) => {
        console.log(e.target.value)
        const userDetails = [authService.getLoggedInUserName()];
        userDetails.push(e.target.value);
        authService.registerSuccessfulLogin(userDetails)
    }
    render(){
        const authService = new MomoAuthService();
        const errors = {};
        const values = []
        const senderEmailRef = createRef();

        if(!this.props.cart || this.props.cart.length === 0){
            return <tr>
                <td colSpan="2">Your cart is empty!</td>
            </tr>
        } else {
            return <Fragment>
                {
                    
                    Array.of(this.props.cart.message).map(item => ( <Fragment key={item.messageId} > 
                            
                            <tr className="border-b  dark:bg-gray-800  dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2 mr-4">Sender's Email: </td>
                                <td colSpan={3} className="px-3 py-2"><input  ref={ senderEmailRef } style={{ fontFamily: '"Roboto", sans-serif'}} type="text" id="sender-id" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full  p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. john@mobilemoneycad.com" value={this.getUserPhone(authService.getLoggedInUserName())} disabled/></td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2 ">Receiver's ID: </td>
                                <td colSpan={3} className="px-3 py-2">
                                <span style={{ color: 'red'}}>{ this.props.errors['receiver'] }</span>
                                    <input style={{ fontFamily: '"Roboto", sans-serif'}} type="text" id="receiving-bank-account" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="e.g. 0241112231"  onChange={(e) => {
                                    this.props.handleChange('receiver', e);
                                    this.props.receiver(e.target.value);
                                    this.props.receivingAmount(item.category.amount);
                                    this.props.sendingAmount((Number(item.category.amount) - Number(item.category.charge)))
                                    this.props.setSendersEmail(senderEmailRef.current.value)
                                    }}/></td>
                            </tr>
                            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">Recipient's Network: </td>
                                <td colSpan={3} className="px-3 py-2">
                                <span style={{ color: 'red'}}>{ this.props.errors['networks'] }</span>
                                <select ref='networks' onChange={
                                    this.props.handleChange.bind(this, 'receiver-networks')} id="networks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected disabled>Select Recipient's Network</option>
                                    <option value="mtn-gh">MTN Ghana</option>
                                    <option value="vodafone-gh">Vodafone Ghana</option>
                                    <option value="tigo-gh">Tigo Airtel</option>
                                </select>
                                </td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">MomoCad ID: </td>
                                <td colspan={3} className="px-3 py-2">
                                    <input style={{ fontFamily: '"Roboto", sans-serif'}} type="text" id="momocad-id" className="bg-gray-50  text-gray-900 text-sm rounded-lg w-full   p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" defaultValue={item.momocadId} placeholder="e.g 01FCDASKJ" disabled/>
                                </td>
                            </tr>
                            <tr className="border-b  dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={4} className="px-3 py-2" >
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg w-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={item.body} placeholder="Message..."
                                onChange={ (e) => {
                                    this.handleChangeOnMsg(e);
                                    this.props.handleChange('message', e);
                                    this.props.setMessage(e.target.value)
                                } }
                                ></textarea>
                                 <button disabled type="button" class={this.state.messageText.length > this.state.characterLimit ? 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4':' disabled text-amber bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-4'}>{this.state.messageText.length} / {this.state.characterLimit}</button>
                                    <span style={{ color: 'red', display: 'block'}}>{ this.props.errors['message'] }</span>
                                </td>
                            </tr>
                            <tr className="border-b dark:bg-gray-800 dark:border-gray-700">
                                <td colSpan={1} className="px-3 py-2">Confirm Receiver's ID: </td>
                                <td colSpan={3} className="px-3 py-2">
                                    <span style={{ color: 'red'}}>{ this.props.errors['confirm'] }</span>
                                    <input ref='confirm'  onChange={e =>  {
                                        this.props.handleChange('confirm', e);
                                        this.props.confirm(e.target.value);
                                    }} type="text" id="confirm-receiver-id" style={{ fontFamily: '"Roboto", sans-serif'}} className="bg-gray-50  text-gray-900 text-sm rounded-lg   w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white" placeholder="0240183836" required/>
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
            </Fragment>
        }
    }
}