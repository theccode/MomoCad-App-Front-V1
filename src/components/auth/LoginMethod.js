import { Field, Formik } from "formik";
import Input from "antd/es/input/Input";
import { Button, DatePicker, Form, Tag } from "antd";
import moment from "moment";
import React, { Component } from "react";
import { MomoAuthService } from "./MomoAuthService";

export class LoginMethod extends Component {
    state = {
        value: 1,
        method: 'email'
    }
    onChange = e => this.setState({
        value: e.target.value
    })
    handleLoginMethod = () => {
        const authService = new MomoAuthService();
        if ( this.state.method.toLocaleLowerCase() === 'email'){
            authService.setAuthMethod('email');
            this.props.showLoginModal();
            this.props.hideLoginModal();
        } else {
            authService.setAuthMethod('phone');
            this.props.showLoginWithPhoneModal();
            this.props.hideLoginWithPhoneModal();
        }
    }
    render() {
        const BottomMargin = { marginBottom: '0.7em' }
        const fieldStyle = {backgroundColor: 'transparent', outline:'none', border: 'none', color:'#FF0000', ...BottomMargin};
        return <>
                <Formik
                        initialValues={{ method: '' }}
                        validate={values => {
                            const errors = {};
                             if (!values.method){
                                errors.method = 'Please select a login method';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                           this.handleLoginMethod();
                        }}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            isSubmitting,
                            isValid
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div role="group" aria-labelledby="my-radio-group">
                                    
                                    <label>
                                    <Field type="radio" name="method" value="Email" />
                                        <nbsp /> Email  <nbsp /> 
                                    </label>
                                    <label>
                                    <Field type="radio" name="method" value="Phone" />
                                        <nbsp /> Phone <nbsp />
                                    </label>
                                </div>
                                {errors.method && touched.method &&  <Tag style={fieldStyle}>{ errors.method }</Tag>} <br/>
                                
                                <Button 
                                disabled={isSubmitting && touched && !isValid} 
                                onClick={ () => {
                                    this.setState({
                                        method: values.method
                                    })
                                    handleSubmit();
                                    this.props.hideLoginMethod();
                                }  }
                                >
                                    Next
                                </Button>
                            </form>
                        )}
            </Formik>
        </>
    }
}