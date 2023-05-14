import { Component } from "react";
import {Formik } from "formik";
import Input from "antd/es/input/Input";
import { Button, Tag } from "antd";
import { MomoAuthService } from "./MomoAuthService";

export class LoginWithPhone extends Component{
    state = {
        showSuccessMessage: false,
        hasLogInFailed: false
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
        momoAuthService.executeBasicAuthenticationService(null, values.phoneNumber, values.password).then((res) => {
            Array.of(res.data).map(user => {
                const user_credentials = {
                    customerName: user.firstName + ' ' + user.lastName,
                    customerMsisdn: user.phoneNumber,
                    customerEmail: user.username || null
                }
                momoAuthService.setUserDetails(
                    user_credentials
                )
                momoAuthService.registerSuccessfulLogin(user.phoneNumber, user.phoneNumber)
            })
            this.props.history.push('/momocad/shop/messages')
        }).catch(error => {
            this.setState({showSuccessMessage: false})
            // this.setState({hasLogInFailed: true})
            // console.log(error.response.status)
            // this.setMissMatchError(error.response.status);
            this.props.showError();
        });
    }
    render(){
        const BottomMargin = { marginBottom: '0.7em',  backgroundColor: '#2d2c2c' };
        const fieldStyle = {backgroundColor: 'transparent', outline:'none', border: 'none', color:'#FF0000', ...BottomMargin};
        return <>
                <Formik
                        initialValues={{phoneNumber: '', password: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.phoneNumber) {
                            errors.email = 'Phone number is required';
                            }
                             if (!values.password){
                                errors.password = 'Password is required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {               
                           this.login(values);
                        // console.log(values)
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
                            <form onSubmit={handleSubmit}>
                            <Input
                                style={ BottomMargin }
                                name="phoneNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber}
                                placeholder='Phone Number e.g. 0248383831'
                                className="dark:bg-gray-100"
                            />
                            {errors.phoneNumber && touched.phoneNumber &&  <Tag style={fieldStyle}>{errors.phoneNumber}</Tag>}
                            <Input
                                style={ BottomMargin }
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password...'
                            />
                            {errors.password && touched.password &&  <Tag style={fieldStyle}>{errors.password}</Tag>}
                            <Button 
                            disabled={isSubmitting || touched && !isValid} 
                            onClick={() => handleSubmit()}
                            >
                                Login
                            </Button>
                            <Button style={{ marginLeft: '1rem'}}
                            onClick={() => {this.props.onSignupPressed(); this.props.hideLoginWithPhone()}}
                            >
                                Sign up
                            </Button>
                            </form>
                        )}
            </Formik>
        </>
    }
}