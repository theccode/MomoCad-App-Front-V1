import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PhoneCartDetailsRows } from "./PhoneCartDetailsRows";
import { NavigationBar } from "../../NavigationBar";
import Footer from "../../Footer";
import Finish from "../../../success.gif";
import { Alert, ConfigProvider, Modal, message, theme } from "antd";
import { MomoAuthService } from "../../auth/MomoAuthService";
import { RestUrls } from "../../data/Urls";
import {Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";



export class PhoneCartDetails extends Component{
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {},
            messageLength: 0,
            characterLimit: 160,
            receiverNumber:'',
            senderNumber: '',
            confirmNumber: '',
            isTransactionStatusModalShown: false,
            confirmLoading: true,
            network: '',
            sendingAmount:'',
            receivingAmount:'', 
            response: '',
            message: '',
            isClosable: true,
            retry: false,
            sendViewShown: false,
            isRecipientPaid: true
        }; 
    }
    handleChange = (field, e) => {
        // this.props.updateQuantity(message, Number(event.target.value));
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields })
    }
    handleCheckout = (cart) =>{
        this.props.history.push(`/momocad/thanks`)
        return cart[0];
    }
    handleAddToCart = (...args) => {
        this.props.addToCart(...args);
        this.props.history.push("/momocad/shop/momo-user-cart");
    }

    setMessageLength = (messageLength) => this.setState({messageLength: messageLength});
    setCharacterLimit = (characterLimit) => this.setState({ characterLimit: characterLimit});
    setReceiverNumber = (receiver) => this.setState({ receiverNumber: receiver})
    setConfirmNumber = (confirm) => this.setState({ confirmNumber: confirm})
    setNetwork = (network) => this.setState({network: network});
    setSendingAmount = (amount) => this.setState({sendingAmount: amount});
    setReceivingAmount = (amount) => this.setState({ receivingAmount: amount });
    setMessage = (message) => this.setState({message: message});
    setSenderNumber = (number) => this.setState({senderNumber: number})

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields['receiver']){
            formIsValid = false;
            errors['receiver'] = 'Receiver ID cannot be empty.';
        }

        if (!fields['networks']){
            formIsValid = false;
            errors['networks'] = 'Please select a network.';
        }

        if (!fields['receiver-networks']){
            formIsValid = false;
            errors['receiver-networks'] = 'Recipient\'s network cannot be empty.'
        }
        if (!fields['confirm']){
            formIsValid = false;
            errors['confirm'] = 'Please confirm Receiver\'s contact.';
        } else if (this.state.receiverNumber !== this.state.confirmNumber){
            formIsValid = false;
            errors['confirm'] = 'Receiver contact mismatch.'
        }

        if (this.state.messageLength > this.state.characterLimit){  
            formIsValid = false;
            errors['message'] = 'Message cannot exceed 160 charaters.';
        }
        this.setState({
            errors: errors
        })
        return formIsValid;
    }

    showTransactionStatusModal = () => this.setState({
        isTransactionStatusModalShown: true
    })

    hideTransactionStatusModal = () => this.setState({
        isTransactionStatusModalShown: false
    })
    handleTransaction = () => {
        const message = this.props.cart[0].message.body;
        const formattedMessage = this.state.message;
        if (message.length < formattedMessage.length){
            this.props.cart[0].message.body = formattedMessage;
        }
        this.props.send_money();
        // this.openSendView(true);
        this.props.checkout(this.handleCheckout(this.props.cart));
    }

    handleFinalStep = () => {
        // this.props.checkout(this.handleCheckout(this.props.cart));
    }

    handleOrder = (status) => {
        this.props.placeOrder(status);
    }
    handleConfirmLoading = (isLoading) => {
        this.setState({
            confirmLoading: isLoading
        })
    }
    handleRecipientPayment = (isLoading) => {
        this.setState({
            isRecipientPaid: isLoading
        })
    }
    openSendView = (value) => this.setState({
        sendViewShown: value
    })
    
    authService = new MomoAuthService();
    componentDidUpdate(){
        const status = {
            'success': true,
            'failed': false,
            'null': false
        }
        const receiveSock = new SockJS(RestUrls.SOCKET_URL);
        
        let receiveStompClient = Stomp.over(receiveSock);
        
        const clientRef = this.authService.getClientReference();
        receiveSock.onopen = function(){
        }
      
        const self = this;
        receiveStompClient.connect({}, function(frame){
            receiveStompClient.subscribe(`/api/shop/receive-momo/res`, function(response){
                const body = JSON.parse(response.body);
                const transactionState = status[body.message];
                if (clientRef === body.data.clientReference){
                    self.handleConfirmLoading(!transactionState);
                    self.setState({
                        isTransactionStatusModalShown: transactionState,
                        isClosable: !transactionState,
                    });
                }
            }); 
        })
        
        receiveStompClient.reconnect_delay = 2000;
        
    };
    
    componentDidMount() {
        const responses = {
            '0000': true,
            '0001': true
        }
        const sendSock = new SockJS(RestUrls.SOCKET_URL);
        let sendStompClient = Stomp.over(sendSock);
        sendSock.onopen = function(){

        }
        const self = this;
        sendStompClient.connect({}, function(frame){
            sendStompClient.subscribe('/api/shop/send-momo/res', function(response){
                const body = JSON.parse(response.body);
                const transactionState = responses[body.responseCode];
                console.log(body.responseCode);
                self.handleRecipientPayment(!transactionState);
                self.handleOrder(transactionState);
            })
        });
        sendStompClient.reconnect_delay = 2000;
    }

    getLinkClasses = ()=>`inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white ${this.props.cartItems === 0 ? 'disabled' : ''}
    `;

    render() {
        const { isRecipientPaid, isTransactionStatusModalShown, sendingAmount, receivingAmount, confirmLoading, isClosable, sendViewShown} = this.state;
        const authService = new MomoAuthService();
        const transactionDetails = {
            channel: this.state.fields['networks'],
            receiverNetwork: this.state.fields['receiver-networks'],
            sendingAmount: sendingAmount,
            receivingAmount: receivingAmount,
            description: 'MOMOCAD'
        }
        return <>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b'
                },
                algorithm: theme.darkAlgorithm
            }}
        >
            <Modal
                title="Transaction initiated..."
                open={ isTransactionStatusModalShown }
                onOk={ this.handleTransaction }
                onCancel={ isClosable ? this.hideTransactionStatusModal : this.showTransactionStatusModal}
                confirmLoading={ confirmLoading }
                width={400}
                closable={isClosable}
                maskClosable={false}
                okText={ confirmLoading ? "Preparing...":"Proceed"}
                >
                    <Alert message="You'll receive a prompt on your phone to continue with this purchase, click on 'Proceed' after the loading is done to complete the transaction or 'Cancel' to cancel the transaction. Thank you!" />
            </Modal>
            <Modal
            title="Final step..."
            open={sendViewShown}
            onOk={ this.handleFinalStep }
            confirmLoading={ isRecipientPaid }
            closable={ false }
            okText={ isRecipientPaid ? 'Finalising...':'Finish'}
            >
            {
                isRecipientPaid ? (<div role="status" className="text-center">
                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>):<img src={Finish} alt="Finish animation image" />
            }
            </Modal>
        </ConfigProvider>
        <NavigationBar {...this.props } display='none' />
            <div className="flex  justify-center items-center flex-col bg-gray-900">
                <div className="flex flex-col items-center justify-center  mb-4">
                    <p className="text-2xl text-gray-400 mt-4 dark:text-gray-500" style={{fontSize: '1.2 em', fontWeight: 'bold'}}>SENDING PAGE</p>
                    <div className="flex mt-2">
                    </div>
                </div>
                <table className="shadow-xl m-2 p-2 border bg-gray-800  border-gray-800 text-gray-500 dark:text-gray-400">
                    <tbody>
                       { <PhoneCartDetailsRows 
                        cart={ this.props.cart } 
                        cartPrice={ this.props.cartPrice }
                        updateQuantity={ this.props.updateCartQuantity }
                        removeFromCart={ this.props.removeFromCart }
                        handleChange={ this.handleChange }
                        errors = {this.state.errors}
                        fields={this.state.fields}
                        setMessageLength={ this.setMessageLength }
                        setCharacterLimit={ this.setCharacterLimit }
                        receiver={ this.setReceiverNumber }
                        confirm={ this.setConfirmNumber }
                        network={ this.setNetwork }
                        receivingAmount={ this.setReceivingAmount}
                        sendingAmount={ this.setSendingAmount }
                        setMessage={ this.setMessage }
                        setSenderNumber={ this.setSenderNumber }
                        />}
                    </tbody>
                </table>
                <div className="m-5">
                    <button type="button" class="text-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 hover:text-gray-900 mr-1 mb-2">
                        <svg aria-hidden="true" class="h-4 mr-2 -ml-1 w-7" viewBox="0 0 601 360" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M359.01 179.504C359.01 278.647 278.639 359.004 179.5 359.004C80.361 359.004 0 278.643 0 179.504C0 80.3709 80.362 0.00390625 179.5 0.00390625C278.637 0.00390625 359.01 80.3749 359.01 179.504Z" fill="#D9222A"/><path d="M420.489 0C374.11 0 331.846 17.596 299.989 46.467C293.499 52.356 287.441 58.704 281.864 65.463H318.131C323.096 71.5 327.667 77.85 331.816 84.475H268.181C264.354 90.597 260.9 96.944 257.839 103.483H342.152C345.046 109.668 347.583 116.013 349.753 122.487H250.24C248.15 128.721 246.408 135.067 245.023 141.495H354.963C357.652 153.985 359.008 166.726 359.005 179.503C359.005 199.438 355.751 218.615 349.751 236.524H250.238C252.402 243.001 254.938 249.348 257.834 255.532H342.15C339.087 262.073 335.631 268.421 331.803 274.545H268.178C272.325 281.165 276.897 287.511 281.863 293.541H318.122C312.552 300.313 306.492 306.668 299.992 312.554C331.849 341.42 374.109 359.008 420.492 359.008C519.631 359.008 600.002 278.647 600.002 179.508C600.002 80.379 519.631 0.00799561 420.492 0.00799561" fill="#EE9F2D"/><path d="M576.07 279.564C576.07 276.365 578.662 273.763 581.866 273.763C585.07 273.763 587.662 276.365 587.662 279.564C587.662 282.763 585.07 285.365 581.866 285.365C578.662 285.365 576.07 282.763 576.07 279.564ZM581.866 283.972C584.3 283.971 586.273 281.998 586.274 279.564C586.274 277.132 584.303 275.162 581.872 275.16H581.866C579.437 275.157 577.466 277.123 577.462 279.551V279.565C577.46 281.998 579.43 283.971 581.862 283.973C581.863 283.972 581.865 283.972 581.866 283.972V283.972ZM581.083 282.112H579.896V277.016H582.045C582.495 277.016 582.953 277.016 583.35 277.27C583.763 277.549 583.996 278.041 583.996 278.549C583.996 279.12 583.658 279.653 583.112 279.861L584.05 282.111H582.735L581.956 280.094H581.085L581.083 282.112V282.112ZM581.083 279.222H581.741C581.987 279.222 582.246 279.243 582.467 279.122C582.662 278.997 582.763 278.763 582.763 278.538C582.758 278.329 582.651 278.136 582.475 278.02C582.268 277.891 581.939 277.919 581.717 277.919H581.083V279.222ZM137.583 199.159C135.537 198.921 134.638 198.858 133.233 198.858C122.187 198.858 116.595 202.645 116.595 210.126C116.595 214.737 119.324 217.671 123.582 217.671C131.521 217.671 137.241 210.112 137.583 199.159V199.159ZM151.754 232.155H135.608L135.979 224.479C131.053 230.544 124.483 233.428 115.553 233.428C104.99 233.428 97.7492 225.178 97.7492 213.199C97.7492 195.175 110.345 184.658 131.966 184.658C134.174 184.658 137.008 184.857 139.907 185.228C140.511 182.787 140.67 181.74 140.67 180.427C140.67 175.519 137.274 173.69 128.17 173.69C118.637 173.582 110.774 175.961 107.545 177.023C107.749 175.794 110.245 160.364 110.245 160.364C119.957 157.518 126.361 156.447 133.57 156.447C150.302 156.447 159.166 163.96 159.149 178.159C159.182 181.964 158.552 186.659 157.57 192.83C155.879 203.564 152.25 226.551 151.754 232.155V232.155ZM89.5962 232.155H70.1092L81.2712 162.158L56.3462 232.155H43.0672L41.4252 162.558L29.6922 232.155H11.4502L26.6872 141.099H54.7082L56.4082 192.067L73.5002 141.099H104.667L89.5962 232.155ZM444.566 199.159C442.529 198.921 441.625 198.858 440.224 198.858C429.183 198.858 423.59 202.645 423.59 210.126C423.59 214.737 426.316 217.671 430.573 217.671C438.513 217.671 444.237 210.112 444.566 199.159V199.159ZM458.75 232.155H442.604L442.97 224.479C438.044 230.544 431.47 233.428 422.548 233.428C411.983 233.428 404.748 225.178 404.748 213.199C404.748 195.175 417.336 184.658 438.961 184.658C441.169 184.658 443.998 184.857 446.895 185.228C447.499 182.787 447.658 181.74 447.658 180.427C447.658 175.519 444.266 173.69 435.162 173.69C425.629 173.582 417.775 175.961 414.533 177.023C414.737 175.794 417.242 160.364 417.242 160.364C426.954 157.518 433.354 156.447 440.555 156.447C457.295 156.447 466.159 163.96 466.142 178.159C466.174 181.964 465.545 186.659 464.563 192.83C462.879 203.564 459.242 226.551 458.75 232.155V232.155ZM238.36 231.03C233.027 232.709 228.869 233.428 224.36 233.428C214.398 233.428 208.961 227.703 208.961 217.161C208.819 213.89 210.394 205.281 211.632 197.424C212.757 190.507 220.081 146.895 220.081 146.895H239.452L237.189 158.103H248.888L246.246 175.899H234.504C232.254 189.982 229.05 207.524 229.013 209.849C229.013 213.665 231.05 215.332 235.684 215.332C237.905 215.332 239.624 215.105 240.938 214.632L238.36 231.03V231.03ZM297.752 230.43C291.098 232.464 284.677 233.447 277.873 233.43C256.189 233.409 244.886 222.084 244.886 200.398C244.886 175.085 259.266 156.451 278.785 156.451C294.756 156.451 304.956 166.884 304.956 183.247C304.956 188.676 304.256 193.976 302.568 201.459H263.994C262.689 212.2 269.564 216.676 280.831 216.676C287.766 216.676 294.019 215.247 300.973 212.013L297.752 230.43V230.43ZM286.864 186.53C286.971 184.987 288.919 173.313 277.851 173.313C271.68 173.313 267.268 178.017 265.471 186.53H286.864V186.53ZM163.444 181.513C163.444 190.88 167.986 197.339 178.286 202.189C186.178 205.898 187.398 206.999 187.398 210.359C187.398 214.976 183.919 217.06 176.207 217.06C170.394 217.06 164.986 216.152 158.749 214.138C158.749 214.138 156.186 230.459 156.069 231.24C160.499 232.207 164.449 233.101 176.348 233.43C196.911 233.43 206.407 225.601 206.407 208.68C206.407 198.505 202.431 192.534 192.67 188.046C184.499 184.296 183.562 183.459 183.562 180.001C183.562 175.997 186.799 173.955 193.099 173.955C196.924 173.955 202.149 174.363 207.099 175.067L209.874 157.892C204.828 157.092 197.178 156.45 192.724 156.45C170.923 156.451 163.377 167.838 163.444 181.513V181.513ZM392.534 158.397C397.946 158.397 402.992 159.818 409.946 163.318L413.134 143.555C410.28 142.434 400.23 135.855 391.717 135.855C378.676 135.855 367.652 142.326 359.897 153.005C348.588 149.259 343.939 156.83 338.24 164.372L333.177 165.551C333.56 163.068 333.906 160.601 333.789 158.105H315.893C313.448 181.022 309.115 204.233 305.722 227.18L304.838 232.156H324.334C327.588 211.013 329.371 197.476 330.455 188.314L337.796 184.23C338.893 180.152 342.325 178.772 349.213 178.939C348.287 183.947 347.824 189.03 347.83 194.123C347.83 218.348 360.9 233.431 381.88 233.431C387.284 233.431 391.921 232.719 399.101 230.773L402.531 210.014C396.073 213.195 390.772 214.691 385.972 214.691C374.643 214.691 367.788 206.328 367.788 192.506C367.788 172.455 377.984 158.397 392.534 158.397" fill="black"/><path d="M95.2095 226.744H75.7184L86.8895 156.756L61.9635 226.744H48.6805L47.0385 157.156L35.3055 226.744H17.0645L32.3015 135.702H60.3224L61.1104 192.064L80.0145 135.702H110.281L95.2095 226.744Z" fill="white"/><path d="M557.52 141.104L553.199 167.413C547.87 160.4 542.145 155.325 534.587 155.325C524.754 155.325 515.804 162.78 509.945 173.75C501.787 172.058 493.348 169.187 493.348 169.187L493.344 169.254C494.002 163.12 494.265 159.379 494.206 158.108H476.306C473.868 181.025 469.535 204.236 466.149 227.183L465.256 232.159H484.748C487.381 215.063 489.396 200.868 490.881 189.608C497.539 183.592 500.873 178.342 507.602 178.692C504.623 185.897 502.877 194.195 502.877 202.709C502.877 221.222 512.243 233.434 526.41 233.434C533.552 233.434 539.031 230.972 544.377 225.263L543.464 232.147H561.899L576.741 141.105L557.52 141.104V141.104ZM533.149 215.045C526.515 215.045 523.166 210.137 523.166 200.449C523.166 185.894 529.437 175.574 538.278 175.574C544.973 175.574 548.598 180.678 548.598 190.083C548.599 204.762 542.228 215.045 533.149 215.045V215.045Z" fill="black"/><path d="M143.19 193.764C141.148 193.528 140.244 193.465 138.844 193.465C127.798 193.465 122.21 197.252 122.21 204.731C122.21 209.335 124.939 212.278 129.189 212.278C137.136 212.277 142.857 204.719 143.19 193.764V193.764ZM157.368 226.748H141.222L141.589 219.085C136.668 225.139 130.089 228.035 121.168 228.035C110.601 228.035 103.363 219.785 103.363 207.806C103.363 189.774 115.955 179.264 137.58 179.264C139.788 179.264 142.622 179.464 145.518 179.835C146.122 177.394 146.281 176.348 146.281 175.027C146.281 170.118 142.889 168.298 133.785 168.298C124.248 168.19 116.389 170.569 113.156 171.619C113.36 170.394 115.856 154.982 115.856 154.982C125.564 152.124 131.976 151.053 139.176 151.053C155.913 151.053 164.78 158.57 164.764 172.757C164.793 176.578 164.16 181.27 163.18 187.432C161.493 198.156 157.861 221.156 157.368 226.748V226.748ZM418.748 138.156L415.557 157.923C408.607 154.427 403.557 153.003 398.15 153.003C383.599 153.003 373.4 167.061 373.4 187.109C373.4 200.93 380.257 209.29 391.584 209.29C396.384 209.29 401.68 207.798 408.138 204.615L404.717 225.365C397.533 227.322 392.901 228.035 387.492 228.035C366.515 228.035 353.441 212.951 353.441 188.726C353.441 156.176 371.5 133.426 397.329 133.426C405.836 133.427 415.89 137.035 418.748 138.156V138.156ZM450.191 193.764C448.15 193.528 447.25 193.465 445.844 193.465C434.803 193.465 429.211 197.252 429.211 204.731C429.211 209.335 431.94 212.278 436.194 212.278C444.132 212.277 449.857 204.719 450.191 193.764V193.764ZM464.369 226.748H448.219L448.59 219.085C443.665 225.139 437.09 228.035 428.169 228.035C417.606 228.035 410.365 219.785 410.365 207.806C410.365 189.774 422.961 179.264 444.577 179.264C446.79 179.264 449.619 179.464 452.518 179.835C453.119 177.394 453.281 176.348 453.281 175.027C453.281 170.118 449.888 168.298 440.786 168.298C431.253 168.19 423.39 170.569 420.156 171.619C420.36 170.394 422.86 154.982 422.86 154.982C432.569 152.124 438.976 151.053 446.176 151.053C462.917 151.053 471.78 158.57 471.759 172.757C471.792 176.578 471.163 181.27 470.18 187.432C468.498 198.156 464.857 221.156 464.369 226.748ZM243.979 225.627C238.641 227.306 234.483 228.035 229.979 228.035C220.017 228.035 214.58 222.309 214.58 211.767C214.442 208.488 216.018 199.887 217.255 192.031C218.375 185.105 225.7 141.497 225.7 141.497H245.068L242.808 152.709H252.749L250.103 170.497H240.128C237.878 184.589 234.665 202.117 234.632 204.447C234.632 208.277 236.673 209.929 241.303 209.929C243.524 209.929 245.241 209.713 246.557 209.238L243.979 225.627V225.627ZM303.37 225.035C296.72 227.068 290.291 228.047 283.491 228.035C261.806 228.014 250.504 216.689 250.504 195.002C250.504 169.681 264.883 151.052 284.403 151.052C300.374 151.052 310.574 161.481 310.574 177.852C310.574 183.286 309.874 188.585 308.19 196.064H269.616C268.31 206.805 275.185 211.286 286.453 211.286C293.383 211.286 299.641 209.851 306.591 206.609L303.37 225.035V225.035ZM292.479 181.123C292.595 179.585 294.539 167.906 283.466 167.906C277.299 167.906 272.887 172.623 271.091 181.123H292.479ZM169.059 176.118C169.059 185.485 173.601 191.936 183.901 196.793C191.793 200.502 193.013 201.605 193.013 204.965C193.013 209.581 189.53 211.664 181.825 211.664C176.009 211.664 170.6 210.756 164.358 208.743C164.358 208.743 161.804 225.064 161.687 225.844C166.108 226.811 170.062 227.694 181.962 228.035C202.528 228.035 212.021 220.206 212.021 203.289C212.021 193.109 208.05 187.139 198.284 182.652C190.117 178.893 189.171 178.068 189.171 174.606C189.171 170.606 192.417 168.547 198.713 168.547C202.534 168.547 207.759 168.968 212.717 169.672L215.488 152.493C210.446 151.693 202.796 151.052 198.342 151.052C176.538 151.052 168.996 162.431 169.059 176.118V176.118ZM567.509 226.748H549.071L549.988 219.855C544.641 225.572 539.163 228.035 532.02 228.035C517.854 228.035 508.492 215.822 508.492 197.309C508.492 172.679 523.013 151.917 540.2 151.917C547.759 151.917 553.479 155.004 558.804 162.013L563.129 135.705H582.35L567.509 226.748V226.748ZM538.763 209.639C547.838 209.639 554.213 199.356 554.213 184.686C554.213 175.281 550.584 170.177 543.888 170.177C535.051 170.177 528.773 180.492 528.773 195.052C528.772 204.738 532.13 209.639 538.763 209.639ZM481.921 152.71C479.48 175.627 475.148 198.84 471.759 221.773L470.867 226.749H490.358C497.33 181.474 499.016 172.632 509.946 173.74C511.688 164.473 514.928 156.357 517.345 152.261C509.182 150.561 504.624 155.174 498.657 163.936C499.128 160.148 499.99 156.469 499.819 152.711L481.921 152.71V152.71ZM321.501 152.71C319.055 175.627 314.722 198.84 311.334 221.773L310.446 226.749H329.946C336.909 181.474 338.592 172.632 349.516 173.74C351.266 164.473 354.507 156.357 356.915 152.261C348.761 150.561 344.198 155.174 338.236 163.936C338.707 160.148 339.56 156.469 339.398 152.711L321.501 152.71V152.71ZM576.071 220.951C576.067 217.752 578.657 215.156 581.855 215.152H581.867C585.064 215.148 587.66 217.738 587.663 220.935V220.951C587.662 224.152 585.068 226.746 581.867 226.748C578.666 226.746 576.072 224.152 576.071 220.951V220.951ZM581.867 225.356C584.298 225.358 586.269 223.387 586.27 220.957V220.953C586.273 218.52 584.302 216.547 581.871 216.545H581.867C579.432 216.546 577.46 218.519 577.459 220.953C577.461 223.385 579.434 225.356 581.867 225.356ZM581.083 223.485H579.895V218.403H582.048C582.494 218.403 582.957 218.412 583.344 218.657C583.761 218.94 583.998 219.424 583.998 219.931C583.998 220.506 583.661 221.043 583.11 221.248L584.051 223.484H582.731L581.952 221.475H581.082L581.083 223.485ZM581.083 220.606H581.736C581.982 220.606 582.249 220.625 582.465 220.506C582.661 220.381 582.761 220.145 582.761 219.918C582.752 219.708 582.647 219.514 582.474 219.395C582.27 219.278 581.932 219.311 581.711 219.311H581.082L581.083 220.606V220.606Z" fill="white"/></svg>
                    <Link to="/momocad/shop/messages"> Return to Shop</Link>
                   
                    </button>                   
                    <button type="button" class="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2" onClick={() => {
                         authService.setTransactionDetails(transactionDetails);
                        if (this.handleValidation()){
                            this.props.receive_money();
                            this.showTransactionStatusModal();
                        }
                    }}>
                    <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="mobile" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"></path></svg>
                    Send with Momo
                    </button>
                </div>
            </div>
            <Footer />
        </>
    }
}