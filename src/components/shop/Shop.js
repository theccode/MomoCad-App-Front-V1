import React, { Component } from "react";
import { MessageList } from "./MessageList";
import { NavigationBar } from "../NavigationBar";
import { Jumbotron } from "../Jumbotron";
import Footer from "../Footer";
import { Alert, Modal } from "antd";
import { SignupWithEmail } from "../auth/SignupWithEmail";
import { LoginWithEmail } from "../auth/LoginWithEmail";
import { MomoAuthService } from "../auth/MomoAuthService";
import { Redirect } from "react-router-dom";
import { LoginMethod } from "../auth/LoginMethod";
import { SignupWithPhone } from "../auth/SignupWithPhone";
import { LoginWithPhone } from "../auth/LoginWithPhone";
import { RegisterMethod } from "../auth/RegisterMethod";
import { Otp } from "../auth/otp/Otp";

export class Shop extends Component{
    state = {
        isRegisterUserModalVisible: false,
        registerWithPhoneShown: false,
        successModalShown: false,
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
    handleAddToCart = (...args) => {
        const authService = new MomoAuthService();
        this.props.addToCart(...args);
        if (authService.isUserLoggedIn()){
            if (authService.getAuthMethod() === 'email'){
                this.props.history.push("/momocad/shop/cart");
            } else {
                this.props.history.push("/momocad/shop/momo-user-cart");
            }
        } else {
            <Redirect to="/momocad/shop/messages" />
        }
        // this.props.history.push("/momocad/shop/cart");
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
    render(){
        const { isOTPModalShown,isRegisterMethodShown, registerWithPhoneShown, loginWithPhoneShown, isLoginMethodShown, isRegisterUserModalVisible, successModalShown, loginModalShown, isMessagingModalShown, loginFailureShown } = this.state;
        return <div className="mx-auto bg-slate-900 justify-center body text-slate-100">
            <Modal
            title="Confirm OTP"
            open={ isOTPModalShown }
            onOk={ this.hideOtpModal }
            onCancel={ this.hideOtpModal }
            width={400}
            >
                <Otp />
            </Modal>
            <Modal
                title='Select a login method'
                open={ isLoginMethodShown}
                onOk={ this.hideLoginMethod }
                onCancel={ this.hideLoginMethod }
                width={400}
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
            >
                <SignupWithPhone { 
                    ...this.props } 
                    onSuccess={() => this.hideRegisterWithPhoneModal()}
                    showSuccess={() => this.showSuccessModal()}
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
            >
                <Alert message="Invalid Credentials! Or Check your email for confirmation!" type="error" />
            </Modal>
            <Modal
            title="User Login"
            open={ loginModalShown }
            onOk={ this.hideLoginModal }
            onCancel={ this.hideLoginModal }
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
                visible={successModalShown}
                onOk={this.hideSuccessModal}
                onCancel={this.hideSuccessModal}
                            >
                <Alert message="Thank you for registering! Check your email for confirmation." type="success" />
            </Modal>
            <Modal 
            title='Message'
            visible={isMessagingModalShown}
            onOk={this.hideMessagingModal}
            onCancel={this.hideLoginModal}
            >
                <Alert message="Message Sent!" type="success" />
            </Modal>
            <NavigationBar {...this.props} handleRegisterUserClickEvent={this.showRegisterMethodModal} handleSignIn={this.showSuccessModal} handleLoginModal={this.showLoginMethod} showHome="none"/>
            <Jumbotron />
            <div className=" p-2 justify-center">
                <div>
                    
                </div>       
                <MessageList 
                    { ...this.props } 
                    messages={ this.props.messages }
                    addToCart={ this.handleAddToCart }
                    handleLoginModal={ this.showLoginMethod }
                />        
            </div> 
            <Footer /> 
        </div>
    }
}