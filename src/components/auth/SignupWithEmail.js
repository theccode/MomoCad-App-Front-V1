import { Component } from "react";
import { Field, Formik } from "formik";
import Input from "antd/es/input/Input";
import { Button, Checkbox, DatePicker, Form, Tag } from "antd";
import moment from "moment";
import dayjs from "dayjs";

export class SignupWithEmail extends Component{
    state = {
        value: 1,
        userExists: false,
        showPassword: false
    }
    onChange = e => this.setState({value: e.target.value})
    
    handlePasswordField = (e) => this.setState({ showPassword: e.target.checked })
    render(){
        const BottomMargin = { marginBottom: '0.7em', backgroundColor: '#2d2c2c' }
        const data = {
            dateOfBirth: dayjs(new Date(2000, 9, 9))
        }
        let sErrors = {}
        const fieldStyle = {backgroundColor: 'transparent', outline:'none', border: 'none', color:'#FF0000', ...BottomMargin};
        return <>
                <Formik
                        initialValues={{ firstName: '', lastName:'', email: '', password: '', confirmPassword: '', countryOfOrigin:'', dateOfBirth: '', gender: '', userExist: '' }}
                        validate={values => {
                            const errors = {};
                              if (!values.firstName){
                                errors.firstName = 'First Name is required';
                            }
                             if (!values.lastName){
                                errors.lastName = 'Last Name is required';
                            }
                            if (!values.email) {
                            errors.email = 'Email Address is required';
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }

                             if (!values.password){
                                errors.password = 'Password is required';
                            } else if (values.password.length < 8){
                                errors.password = 'Password must be 8 or more characters long!'
                            }
                            if (!values.confirmPassword){
                                errors.confirmPassword = 'Please confirm your password';
                            } else if (values.password !== values.confirmPassword){
                                errors.confirmPassword = 'Password do not match';
                            }
                    
                              if (!values.countryOfOrigin){
                                errors.countryOfOrigin = 'Country of Origin is required';
                            }
                             if (!values.gender){
                                errors.gender = 'Gender is required';
                            }
                             if (!values.dateOfBirth){
                                errors.dateOfBirth = 'Date of birth is required';
                            }
                            sErrors = errors;
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            const res = this.props.addUser(values)
                            this.setState({
                                userExists: true
                            })
                            if (this.state.userExists === true){
                                sErrors.userExist = 'This user already exist.'
                                return;
                            }
                            this.props.onSuccess();
                            this.props.showSuccess();
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
                            setFieldValue,
                            isSubmitting,
                            isValid
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                            <Input
                                style={ BottomMargin }
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                placeholder='First Name e.g. Maxwel'
                            />
                            {errors.firstName && touched.firstName && <Tag style={fieldStyle}>{ errors.firstName }</Tag>}
                            <Input
                            style={ BottomMargin }
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                placeholder='Last Name e.g. Kumah'
                            />
                            {errors.lastName && touched.lastName &&  <Tag style={fieldStyle}>{ errors.lastName }</Tag>}
                            
                            <Input
                                style={ BottomMargin }
                                type={this.state.showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password...'
                            />
                            {errors.password && touched.password &&  <Tag style={fieldStyle}>{ errors.password }</Tag>}
                          
                            <Input
                                style={ BottomMargin }
                                type={this.state.showPassword ? "text" : "password"}
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder='Confirm password...'
                            />
                            {errors.confirmPassword && touched.confirmPassword &&  <Tag style={fieldStyle}>{ errors.confirmPassword }</Tag>}
                            <br/>
                            <Checkbox style={ BottomMargin } onChange={ (e) => this.handlePasswordField(e)}>Show Password</Checkbox>
                            <Input
                                style={ BottomMargin }
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email e.g. maxwell@example.com'
                            />
                            {errors.email && touched.email &&  <Tag style={fieldStyle}>{ errors.email }</Tag>}

                            <Input
                                style={BottomMargin}
                                name="countryOfOrigin"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.countryOfOrigin}
                                placeholder='Country Of Origin'
                            />
                            {errors.countryOfOrigin && touched.countryOfOrigin &&  <Tag style={fieldStyle}>{ errors.countryOfOrigin }</Tag>}
                            Date Of Birth:
                            <Form.Item>
                                <DatePicker
                                name="dateOfBirth"
                                onChange={(value) => setFieldValue('dateOfBirth', value)}
                                />
                            </Form.Item>
                            {errors.dateOfBirth && touched.dateOfBirth &&  <Tag style={ fieldStyle}>{ errors.dateOfBirth }</Tag>}
                            Gender:  
                            <div role="group" aria-labelledby="my-radio-group">                              
                                <label>
                                <Field type="radio" name="gender" value="Male" style={{ color: '#00b96b'}} />
                                    <span> Male </span> 
                                </label>
                                <label>
                                <Field type="radio" name="gender" value="Female" style={{ color: '#00b96b'}} />
                                     <span> Female </span> 
                                </label>
                                <label>
                                    <Field type="radio" name="gender" value="Other" style={{ color: '#00b96b'}} />
                                        <span> Other </span> 
                                </label>
                            </div>
                            {errors.gender && touched.gender &&  <Tag style={fieldStyle}>{ errors.gender }</Tag>} <br/>
                             
                            <Button 
                            disabled={isSubmitting || touched && !isValid} 
                            onClick={() => handleSubmit()}
                            >
                                Register
                            </Button>
                            <Button 
                            disabled={isSubmitting || touched && !isValid} 
                            onClick={ () => {this.props.onLoginPressed(); this.props.hideSignupModal();} }
                             style={{marginLeft: '1rem'}}>
                                Sign In
                            </Button>
                            { errors.userExist && touched.userExist && <Tag style={fieldStyle}>{ errors.userExist }</Tag>}
                            </form>
                        )}
            </Formik>
        </>
    }
}