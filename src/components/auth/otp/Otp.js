import { Component } from "react";
import {Formik } from "formik";
import Input from "antd/es/input/Input";
import { Button, Tag } from "antd";


export class Otp extends Component{
   
   
    render(){
        const BottomMargin = { marginBottom: '0.7em' };
        const fieldStyle = {backgroundColor: 'transparent', outline:'none', border: 'none', color:'#FF0000', ...BottomMargin};
        return <>
                <Formik
                        initialValues={{phoneNumber: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.phoneNumber) {
                            errors.email = 'Phone number is required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {               
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
                                placeholder='Enter the 65digit code (OTP) you received.'
                            />
                            {errors.phoneNumber && touched.phoneNumber &&  <Tag style={fieldStyle}>{errors.phoneNumber}</Tag>}
                            <Button 
                            disabled={isSubmitting || touched && !isValid} 
                            onClick={() => handleSubmit()}
                            >
                                Submit
                            </Button>
                            </form>
                        )}
            </Formik>
        </>
    }
}