import React, {Component} from "react";
import logo from '../momocad.png';
import { CartSummary } from "./shop/CartSummary";
import { NavigationBanner } from "./categorynavigation/NavigationBanner";
import { MomoAuthService } from "./auth/MomoAuthService";
import { Link } from "react-router-dom";
import { initFlowbite } from "flowbite";


export class NavigationBar extends Component{
    handleLogout = (authService) => {
        authService.logout();
        sessionStorage.clear();
        this.props.clearCart();
        this.props.history.push('/momocad/shop/messages')
    }

    componentDidMount(){
        initFlowbite();
    }
  
    render(){
        const authService = new MomoAuthService();
        return(
            <>
              <nav className="bg-gray-900 border-gray-200  py-2.5  bg-gray-900 sticky top-0 z-50 text-white" x-data="{ open: false }">
                  <div className="flex justify-between mx-auto">
                      <Link to="/momocad" className="flex items-stretch">
                          <img src={logo} className="h-12 ml-2 mr-3 sm:h-10" alt="Momocad Logo" /> <br/> 
                      </Link>
                      <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 mr-3 mb-3 text-sm text-gray-200 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-200 hover:bg-gray-900 focus:ring-gray-900 focus:m-2" aria-controls="navbar-default" aria-expanded="false">
                      <span className="sr-only">Open main menu</span>
                      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                      </button>
                      <div className="hidden bg-gray-900 md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 lg:text-white md:mt-0 md:text-sm md:font-medium md:border-0  bg-gray-900  dark:border-gray-700">   
                            <li>
                                <Link className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 hover:text-white md:dark:hover:bg-transparent" style={{display: this.props.showHome}} to="/momocad/shop/messages">Home</Link>
                            </li>
                            <CartSummary {...this.props } display={ this.props.display } />
                            <li>
                                {
                                    authService.isUserLoggedIn() ? <>
                                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 md:w-auto dark:text-white hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent mr-2">Settings <svg className="w-5 h-5 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                                <div id="dropdownNavbar" className="z-10 hidden font-normal bg-gray-800  rounded-lg shadow w-44 m-2 ">
                                    <ul className="py-2 text-sm text-gray-200 text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <Link className="block px-4 py-2 text-gray-400 hover:bg-gray-900 dark:hover:bg-gray-600 hover:text-white cursor-pointer" style={{display: this.props.show}} to="/momocad/shop/user-profile">Profile</Link>
                                    </li>
                                    </ul>
                                    <div className="py-1">
                                    <a href="whatsapp://send?text=Please kindly visit https://www.mobilemoneycad.com for exciting offers today!" data-action="share/whatsapp/share" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-900 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Share</a>
                                    </div>
                                </div>                                    
                                    </>: ''
                                }
                            </li>
                            <li>
                                {
                                    authService.isUserLoggedIn() ? <a className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 hover:text-white md:dark:hover:bg-transparent cursor-pointer" onClick={() => this.handleLogout(authService)}>Logout</a>:
                                    <a className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-900 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 hover:text-white md:dark:hover:bg-transparent cursor-pointer" onClick={() => this.props.handleLoginModal()}>Login</a>

                                }
                            </li>
                            <li>
                            {
                                authService.isUserLoggedIn() ? <Link className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 hover:text-white md:dark:hover:bg-transparent cursor-pointer" style={{ display: this.props.showOrderLink }} to="/momocad/shop/orders"> My Orders</Link>: <a className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 hover:text-white md:dark:hover:bg-transparent cursor-pointer" onClick={() => 
                                        this.props.handleRegisterUserClickEvent()}> Register</a>
                            }
                            </li>
                            
                        </ul>
                      </div>
                  </div>
            <NavigationBanner {...this.props}  display={ this.props.display }/>
              </nav>

            </>

        )
    }
}