import { Component } from "react";
import {Formik } from "formik";
import Input from "antd/es/input/Input";
import { Button, Tag } from "antd";
import { MomoAuthService } from "./MomoAuthService";

export class LoginWithEmail extends Component{
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
        momoAuthService.executeBasicAuthenticationService(values.email, null, values.password).then((res) => {
            Array.of(res.data).map(user => {
               if (user){
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
    render(){
        const BottomMargin = { marginBottom: '0.7em' };
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
                            <form onSubmit={handleSubmit}>
                            <Input
                                style={ BottomMargin }
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email e.g. john@example.com'
                            />
                            {errors.email && touched.email &&  <Tag style={fieldStyle}>{errors.email}</Tag>}
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