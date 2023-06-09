import { Component } from "react";
import {Formik } from "formik";
import Input from "antd/es/input/Input";
import { Button, Checkbox, Tag } from "antd";
import { MomoAuthService } from "./MomoAuthService";

export class LoginWithEmail extends Component{
    state = {
        showSuccessMessage: false,
        hasLogInFailed: false,
        showPassword: false
    }
    setMissMatchError (status){
        if (Number(status) === 409) {
            this.setState({
                hasLogInFailed: true
            })
        }
    };
    login (values) {
        const momoAuthService = new MomoAuthService();
        momoAuthService.executeBasicAuthenticationService(values.email, null, values.password).then((res) => {
            Array.of(res.data).map(user => {
               if (user){
                    const user_credentials = {
                        customerName: user.firstName + ' ' + user.lastName,
                        customerMsisdn: user.email,
                        customerEmail: user.username || null
                    }
                    momoAuthService.setUserDetails(
                        user_credentials
                    )
                    momoAuthService.registerSuccessfulLogin(user.email)
               }
            })
            this.props.history.push('/momocad/shop/messages')
        }).catch(error => {
            this.setState({showSuccessMessage: false})
            // this.setState({hasLogInFailed: true})
            // console.log(error.response.status)
            // this.setMissMatchError(error.response.status);
            // console.log(error.response)
            this.props.showError();
        });
    }

    handlePasswordField = (e) => this.setState({ showPassword: e.target.checked })
    render(){
        const BottomMargin = { marginBottom: '0.7em', backgroundColor: '#2d2c2c' };
        const fieldStyle = {backgroundColor: 'transparent', outline:'none', border: 'none', color:'#FF0000', ...BottomMargin};
        return <>
                <Formik
                        initialValues={{email: '', password: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                            errors.email = 'Email Address is required';
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }

                             if (!values.password){
                                errors.password = 'Password is required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {    
                            this.login(values);           
                            this.props.onSuccess();
                            setSubmitting(false);
                        }}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            isValid
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit} >
                            <Input
                                style={ BottomMargin }
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email e.g. john@example.com'
                                className="bg-zinc-700"
                            />
                            {errors.email && touched.email &&  <Tag style={fieldStyle}>{errors.email}</Tag>}
                            <Input
                                style={ BottomMargin }
                                type={this.state.showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password...'
                                className="dark:bg-zinc-700"
                            />
                            {errors.password && touched.password &&  <Tag style={fieldStyle}>{errors.password}</Tag>}
                            <div>
                            <Checkbox onChange={ (e) => this.handlePasswordField(e)}>Show Password</Checkbox>
                            </div>
                            <br />
                            <Button 
                            disabled={isSubmitting || touched && !isValid} 
                            onClick={() => handleSubmit()}
                            >
                                Login
                            </Button>
                            <Button style={{ marginLeft: '1rem'}}
                            onClick={() => {this.props.onSignupPressed(); this.props.hideSigninModal(); this.props.hideLoginMethod(); }}
                            >
                                Sign up
                            </Button>
                            </form>
                        )}
            </Formik>
        </>
    }
}