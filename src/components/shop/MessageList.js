import React, { Component } from "react";
import { MomoAuthService } from "../auth/MomoAuthService";
import { Alert, ConfigProvider, Modal, theme } from "antd";
import { Link, Redirect, Route } from "react-router-dom";


export class MessageList extends Component{
    state = {
        isUserTermsShowing: false,
        amount: 0.00,
        charge: 0.00,
        rate: 0.00,
        isLoading: true,
        paymentUrl: '',
        amountToPay: 0.00,
        message: null
    }
     status = {
        'Success': false,
        'Error': true
    }
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    openUserTermsModal = () => {
        this.setState({
            isUserTermsShowing: true
        })
    }

    hideUserTermsModal = () => this.setState({
        isUserTermsShowing: false
    })
    setAmount = (amount, charge, rate) => this.setState({
        amount: amount,
        charge: charge,
        rate: rate
    })

    setMessage = (message) => this.setState({
        message: message
    })

    proceedToPaymentProcessingUrl = () => {
        const authService = new MomoAuthService();
        const message = {
            message: this.state.message
        }
        authService.setMomocad(message);
        //  this.props.addToCart()
         this.props.checkout(this.state.paymentUrl)
    }
    handleCallBack(result){
        console.log(result);
        this.setState({
            isLoading: this.status[result.status],
            paymentUrl: result.data.checkoutUrl
        })
    }

    makePaymentCall = ( amount ) => {
       
        const authService = new MomoAuthService();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic ODRrWFFnOmI4M2M1ZDg0YWYwNjQ4OGNhYjM3Y2QxZDgyMDJjNmM1");

        const raw = JSON.stringify({
        "totalAmount": amount,
        "description": "Pay for your momocad.",
        "callbackUrl": "https://www.mobilemoneycad.com/api/shop/visa/pay/res",
        "returnUrl": "https://www.mobilemoneycad.com/momocad/shop/cart",
        "merchantAccountNumber": "2017419",
        "cancellationUrl": "https://www.mobilemoneycad.com",
        "clientReference": authService.getClientReference()
        });

        const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const self = this;

        fetch("https://payproxyapi.hubtel.com/items/initiate", requestOptions)
        .then(response => response.text())
        .then(result => {
            self.handleCallBack(JSON.parse(result))
        })
        .catch(error => console.log('error', error));
    }

    handleUserType = (authService, {...args}) => {
        if (authService.getAuthMethod() === 'email'){
            this.openUserTermsModal()
        } 

        this.props.addToCart({...args});
    }
    render(){
        const authService = new MomoAuthService();
        const { isUserTermsShowing, amount, charge, rate,  isLoading } = this.state;

        const netAmount = ((amount - charge)*rate) - (((amount - charge)*rate) * 0.1 )
        const rawAmount = amount - charge;
        if (this.props.messages === null || this.props.messages.length === 0){
            return <h3 className="p-2 text-center text-2xl">No Messages</h3>
        }
        return (
                <>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#00b96b'
                        },
                        algorithm: theme.darkAlgorithm
                    }}
                >
                    <Modal
                        title="Transaction Initiated..."
                        open={ isUserTermsShowing }
                        onOk={ this.proceedToPaymentProcessingUrl }
                        onCancel={ this.hideUserTermsModal }
                        confirmLoading={ isLoading }
                        width={400}
                        closable={false}
                        maskClosable={false}
                        okText="Proceed"
                        >
                            <Alert message={`By buying this momoCAD, recipient receives an amount of $${ rawAmount } equivalent to GH¢${ netAmount.toFixed(2)}  into their momo wallet.`} type="success" />
                            
                    </Modal>
                </ConfigProvider>
               {
                 this.props.messages.map(message =>
                    <div className="bg-white mt-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto" key={ message.messageId }>
                        <div className="px-5 pb-5 mr-2 py-5">
                            <div className="flex items-center flex-row lg:flex-row md:flex-row justify-between mb-2">
                                <span className="text-xl italic font-semibold tracking-tight text-gray-900 border-dashed p-2 rounded-lg dark:text-white" style={{ fontFamily: 'Roboto'}}>{ message.momocadId  }</span>
                                <h3 className="text-2xl italic mr-3  text-gray-900 dark:text-white" style={{color: `${message.category.colour}`, fontWeight: 'bolder'}}>{message.category.amount}</h3>
                            </div>
                                <hr className="border-gray-200 border-dashed sm:mx-auto dark:border-gray-700 lg:my-1  mt-2 mb-2 md:mt-1 md:mb-1 lg:mt-1 lg:mb-1" /> 
                            <div className="flex items-center flex-col lg:flex-row md:flex-row justify-between">
                                <h5 className="text-xl text-justify  tracking-tight text-gray-900 dark:text-white">{ (message.body.trim()).toLowerCase().charAt(0).toUpperCase() + (message.body.trim()).substring(1, message.body.length).toLowerCase() }</h5>
                                <button type="button"  className="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{float: "right", backgroundColor: `${ message.category.colour }`}} onClick={ () =>{ 
                                    const clientReference = `${this.uuidv4()}`.substring(0, 20);
                                    authService.setClientReference(clientReference);
                                    this.setAmount(message.category.amount, message.category.charge, 1/*this.props.rates[0].rate*/)
                                    this.setMessage(message);
                                    this.makePaymentCall(message.category.amount  /*</div>* this.props.rates[0].rate*/);
                                    authService.setMomocad({message});
                                    authService.isUserLoggedIn() ?  this.handleUserType(authService, message) : this.props.handleLoginModal()
                                    }}>Send</button>
                            </div>
                        </div>
                    </div>

                )
               }
                    </>
        )
    }
}