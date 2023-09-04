import React, { Component } from "react";
import { MessageList } from "./MessageList";
import { NavigationBar } from "../NavigationBar";
import { Jumbotron } from "../Jumbotron";
import Footer from "../Footer";
import { Alert, ConfigProvider, Modal, theme} from "antd";
import { SignupWithEmail } from "../auth/SignupWithEmail";
import { LoginWithEmail } from "../auth/LoginWithEmail";
import { MomoAuthService } from "../auth/MomoAuthService";
import { Redirect } from "react-router-dom";
import { LoginMethod } from "../auth/LoginMethod";
import { SignupWithPhone } from "../auth/SignupWithPhone";
import { LoginWithPhone } from "../auth/LoginWithPhone";
import { RegisterMethod } from "../auth/RegisterMethod";
import { Otp } from "../auth/otp/Otp";
import '../../dist/output.css'
export class Shop extends Component{
    state = {
        isRegisterUserModalVisible: false,
        registerWithPhoneShown: false,
        successModalShown: false,
        phoneSuccessModalShown: false,
        loginModalShown: false,
        loginWithPhoneShown: false,
        isMessagingModalShown: false,
        failed: false,
        loginFailureShown: false,
        isLoginMethodShown: false,
        isRegisterMethodShown: false,
        isOTPModalShown: false
    }
    
    showMessagingModal = () => this.setState({
        isMessagingModalShown: true
    })
    hidMessagingModal = () => this.setState({
        isMessagingModalShown: false
    })
    showLoginModal = () => this.setState({
        loginModalShown: true
    })
    hideLoginModal = () => this.setState({
        loginModalShown: false
    })
    showSuccessModal = () => this.setState({
        successModalShown: true
    })
    hideSuccessModal = () => this.setState({
        successModalShown: false
    })

    showLoginFailureModal = () => this.setState({
        loginFailureShown: true
    })
    hideLoginFailureModal = () => this.setState({
        loginFailureShown: false
    })

    showLoginMethod = () => this.setState({
        isLoginMethodShown: true
    })
    hideLoginMethod = () => this.setState({
        isLoginMethodShown: false
    })

    showLoginWithPhone = () => this.setState({
        loginWithPhoneShown: true
    })
    hideLoginWithPhone = () => this.setState({
        loginWithPhoneShown: false
    })

    showOtpModal = () => this.setState({
        isOTPModalShown: true
    })
    hideOtpModal = () => this.setState({
        isOTPModalShown: false
    })
    handleCheckout = ( paymentUrl ) => {
        const authService = new MomoAuthService();
        if (authService.isUserLoggedIn()){
            if (authService.getAuthMethod() === 'email'){
                window.location.href = paymentUrl;
            } else {
                this.props.history.push("/momocad/shop/momo-user-cart");
            }
        } else {
            <Redirect to="/momocad/shop/messages" />
        }
    }
    
    handleAddToCart = (...args) => {
        const authService = new MomoAuthService();
        const message = authService.getMomocad();
        this.props.addToCart(...args);
        if (authService.getAuthMethod() !== 'email'){
            this.props.history.push("/momocad/shop/momo-user-cart");
        }
    }

    openRegisterUserModal = () => this.setState({
        isRegisterUserModalVisible: true
    })
    
    closeRegisterUserModal = () => this.setState({
        isRegisterUserModalVisible: false,
    })

    showRegisterWithPhoneModal = () => this.setState({
        registerWithPhoneShown: true
    })
    hideRegisterWithPhoneModal = () => this.setState({
        registerWithPhoneShown: false
    })
    
    handleLoginFailure = (failed) => {
        this.setState({failed: true})
    }

    showRegisterMethodModal = () => {
        this.setState({
            isRegisterMethodShown: true
        })
    }
    hideRegisterMethodModal = () => {
        this.setState({
            isRegisterMethodShown: false
        })
    }

    showPhoneSuccessModal = () => this.setState({
        phoneSuccessModalShown: true
    })
    hidePhoneSuccessModal = () => this.setState({
        phoneSuccessModalShown: false
    })
    render(){
        const { isOTPModalShown,isRegisterMethodShown, phoneSuccessModalShown, registerWithPhoneShown, loginWithPhoneShown, isLoginMethodShown, isRegisterUserModalVisible, successModalShown, loginModalShown, isMessagingModalShown, loginFailureShown } = this.state;
        return <div className="mx-auto bg-gray-900 body">
            <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b'
                },
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Modal
            title="Confirm OTP"
            open={ isOTPModalShown }
            onOk={ this.hideOtpModal }
            onCancel={ this.hideOtpModal }
            width={400}
            footer={null}
            maskClosable={false}
            >
                <Otp />
            </Modal>
            <Modal
                title='Select a login method'
                open={ isLoginMethodShown}
                onOk={ this.hideLoginMethod }
                onCancel={ this.hideLoginMethod }
                width={400}
                footer={null}
                maskClosable={false}
            >
                <LoginMethod 
                showLoginModal={this.showLoginModal} 
                showLoginWithPhoneModal={ this.showLoginWithPhone }
                hideLoginMethod={ this.hideLoginMethod }
                />
            </Modal>
            <Modal
                title='Select a sign up method'
                open={ isRegisterMethodShown }
                onOk={ this.hideRegisterMethodModal }
                onCancel={ this.hideRegisterMethodModal }
                width={400}
                footer={null}
                maskClosable={false}
            >
                <RegisterMethod 
                showRegisterModal={this.openRegisterUserModal} 
                showRegisterWithPhoneModal={ this.showRegisterWithPhoneModal }
                hideRegisterMethodModal={ this.hideRegisterMethodModal }
                />
            </Modal>
            <Modal
            title='Register User'
            open={ isRegisterUserModalVisible }
            onOk={ this.closeRegisterUserModal }
            onCancel={ this.closeRegisterUserModal }
            width={400}
            footer={null}
            maskClosable={false}
            >
                <SignupWithEmail { 
                    ...this.props } 
                    onSuccess={() => this.closeRegisterUserModal()}
                    showSuccess={() => this.showSuccessModal()}
                    onLoginPressed={ this.showLoginModal }
                    hideSignupModal={ this.closeRegisterUserModal }
                    />
            </Modal>
            <Modal
            title='Register User'
            open={ registerWithPhoneShown }
            onOk={ this.hideRegisterWithPhoneModal }
            onCancel={ this.hideRegisterWithPhoneModal }
            width={400}
            footer={null}
            maskClosable={false}
            >
                <SignupWithPhone { 
                    ...this.props } 
                    onSuccess={() => this.hideRegisterWithPhoneModal()}
                    showSuccess={() => this.showPhoneSuccessModal()}
                    onLoginPressed={ this.showLoginWithPhone }
                    hideSignupWithPhoneModal={ this.hideRegisterWithPhoneModal }
                    hideLoginMethod={ this.hideLoginMethod }
                    showOtpModal={ this.showOtpModal }
                    />
            </Modal>

            <Modal
                title="Login Failed"
                open={ loginFailureShown }
                onOk={ this.hideLoginFailureModal }
                onCancel={ this.hideLoginFailureModal }
                footer={null}
                maskClosable={false}
            >
                <Alert message="Invalid Credentials! Or Check your email for confirmation!" type="error" />
            </Modal>
            <Modal
            title="User Login"
            open={ loginModalShown }
            onOk={ this.hideLoginModal }
            onCancel={ this.hideLoginModal }
            footer={null}
            maskClosable={false}
            >
                <LoginWithEmail 
                {...this.props}  
                onSuccess={() => this.hideLoginModal()}
                showError={() => this.showLoginFailureModal()}
                onSignupPressed={ this.openRegisterUserModal }
                hideSigninModal={ this.hideLoginModal }
                hideLoginMethod={ this.hideLoginMethod }
                />
            </Modal>
            <Modal
            title="User Login"
            open={ loginWithPhoneShown }
            onOk={ this.hideLoginWithPhone }
            onCancel={ this.hideLoginWithPhone }
            footer={null}
            maskClosable={false}
            >
                <LoginWithPhone 
                {...this.props}  
                onSuccess={() => this.hideLoginWithPhone()}
                showError={() => this.showLoginFailureModal()}
                onSignupPressed={ this.showRegisterWithPhoneModal }
                hideLoginWithPhone={ this.hideLoginWithPhone }
                hideLoginMethod={ this.hideLoginMethod }
                />
            </Modal>
            <Modal
                title="Success"
                open={successModalShown}
                onOk={this.hideSuccessModal}
                onCancel={this.hideSuccessModal}
                footer={null}
                maskClosable={false}
                 >
                    <Alert message="Thank you for registering! Check your email for confirmation." type="success" />
            </Modal>
            <Modal
                title="Success"
                open={ phoneSuccessModalShown }
                onOk={this.hideSuccessModal}
                onCancel={this.hidePhoneSuccessModal}
                footer={null}
                maskClosable={false}
                 >
                    <Alert message="Thank you for registering! An SMS has been sent to your phone. Please confirm your account by tapping on the provided link." type="success" />
            </Modal>
                <Modal 
                title='Message'
                open={isMessagingModalShown}
                onOk={this.hideMessagingModal}
                onCancel={this.hideLoginModal}
                footer={null}
                maskClosable={false}
                >
                    <Alert message="Message Sent!" type="success" />
                </Modal>
            </ConfigProvider>
            <NavigationBar {...this.props} handleRegisterUserClickEvent={this.showRegisterMethodModal} handleSignIn={this.showSuccessModal} handleLoginModal={this.showLoginMethod}  showHome="none"/>
            <Jumbotron />
            <div className=" p-2 justify-center">
                <div>
                    
                </div>       
                <MessageList 
                    { ...this.props } 
                    messages={ this.props.messages }
                    addToCart={ this.handleAddToCart }
                    handleLoginModal={ this.showLoginMethod }
                    checkout={ this.handleCheckout }
                />        
            </div> 
            <Footer /> 
        </div>
    }
}