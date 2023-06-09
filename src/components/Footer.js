import React, { Component } from "react";
import logo from '../momocad.png';
import { Link } from "react-router-dom";
import { Alert, ConfigProvider, Modal, theme } from "antd";

class Footer extends Component{
    state = {
        isAboutModalShown: false,
        isContactModalShown: false,
        isPrivacyModalShown: false,
        isLicensingModalShown: false
    }

    showAboutModal = () => this.setState({isAboutModalShown: true});
    hideAboutModal = () => this.setState({isAboutModalShown: false});
    showContactModal = () => this.setState({isContactModalShown: true});
    hideContactModal = () => this.setState({isContactModalShown: false})
    showPrivacyModal = () => this.setState({isPrivacyModalShown: true});
    hidePrivacyModal = () => this.setState({isPrivacyModalShown: false});
    showLicensingModal = () => this.setState({isLicensingModalShown: true});
    hideLicensingModal = () => this.setState({isLicensingModalShown: false});
    render(){
        const { isAboutModalShown, isContactModalShown, isPrivacyModalShown, isLicensingModalShown } = this.state;
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
                        title="About Us"
                        open={isAboutModalShown}
                        width={400}
                        footer={false}
                        onCancel={this.hideAboutModal}
                        >
                            <Alert message="momoCAD is a platform that enables individuals and businesses to send personalized messages as cash gifts, making any occasion even more special. Our product is perfect for both the youth and adults alike; in and outside Africa."/>
                        </Modal>
                        <Modal
                        title="Contact Us"
                        open={isContactModalShown}
                        width={400}
                        footer={false}
                        onCancel={this.hideContactModal}
                        >
                            <Alert description={ <code>
                                MomoCAD created by MCI LTD, 57, Comm. 18 Road, Community 16, Off Spintex Road. Ghana, West Africa. <br />
                                Tel: +233 208 254 575, +233 544 710 164. <br /> Email: support@mobilemoneycad.com, info@mobilemoneycad.com
                            </code>}
                            />
                        </Modal>
                        <Modal
                        title="Privacy Policy"
                        open={isPrivacyModalShown}
                        width={400}
                        footer={false}
                        onCancel={this.hidePrivacyModal}
                        >
                            <Alert description={ <code>
                                Momocad Privacy Policy
                            </code>}
                            />
                        </Modal>
                        <Modal
                        title="Licensing"
                        open={isLicensingModalShown}
                        width={400}
                        footer={false}
                        onCancel={this.hideLicensingModal}
                        >
                            <Alert description={ <code>
                                Momocad Licensing
                            </code>}
                            />
                        </Modal>
                    </ConfigProvider>
                    
                    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
                        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                            <div className="sm:flex sm:items-center sm:justify-between">
                            <Link to="/momocad" className="flex items-stretch mb-6">
                                <img src={logo} className="h-12 mr-3" alt="MomoCAD Logo" />
                            </Link>
                                <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                                    <li>
                                        <Link className="mr-4 hover:underline md:mr-6" to='' onClick={(e) => {
                                            e.preventDefault();
                                            this.showAboutModal();
                                        }}>About</Link>
                                        {/* <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a> */}
                                    </li>
                                    <li>
                                    <Link className="mr-4 hover:underline md:mr-6" to='' onClick={(e) => {
                                            e.preventDefault();
                                            this.showPrivacyModal();
                                        }}>Privacy Policy</Link>
                                    </li>
                                    <li>
                                    <Link className="mr-4 hover:underline md:mr-6" to='' onClick={(e) => {
                                            e.preventDefault();
                                            this.showLicensingModal();
                                        }}>Licensing</Link>
                                    </li>
                                    <li>
                                    <Link className="mr-4 hover:underline md:mr-6" to='' onClick={(e) => {
                                            e.preventDefault();
                                            this.showContactModal();
                                        }}>Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                            <span className="block text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://mobilemoneycad.com/" className="hover:underline">MomoCAD™</a>. All Rights Reserved.</span>
                        </div>
                    </footer>
                </>
        )
    }
}
export default Footer;