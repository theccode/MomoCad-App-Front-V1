import React, {Component} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from '../logo.png';
import { CartSummary } from "./shop/CartSummary";
import { NavigationBanner } from "./categorynavigation/NavigationBanner";
import { MomoAuthService } from "./auth/MomoAuthService";
import auth from "maildev/lib/auth";
import { Link } from "react-router-dom";
import { Dropdown, Navbar } from "flowbite-react";

export class NavigationBar extends Component{
    handleLogout = (authService) => {
        authService.logout();
        sessionStorage.clear();
        console.log(authService.getLoggedInUserName())
        this.props.history.push('/momocad/shop/messages')
    }
    render(){
        const authService = new MomoAuthService();
        return(
             <>
                 <Navbar className="dark:bg-gray-900" fluid={true} rounded={true}>
                <Navbar.Brand href="https://flowbite.com/">
                    <img
                    src={logo}
                    className="mr-1 h-6 sm:h-9"
                    alt="Momocad Logo"
                    />
          
                </Navbar.Brand>
                {
                    authService.isUserLoggedIn() ? 
                    <div className="flex md:order-2 m-1">
                    <Dropdown
                    inline={true}
                    label="Settings"
                     style={{color: '#FFF', fontWeight: 'bold'}}
                    >
                    <Dropdown.Header>
                        <span className="block text-sm">
                        Susanna Abah
                        </span>
                        <span className="block truncate text-sm font-medium">
                        name@gmail.com
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                    <Link  style={{display: this.props.display}} to="/momocad/shop/user-profile">Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                    Change Password
                    </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                    : ''
                }
                <Navbar.Collapse>
                    <Navbar.Link
                    active={true}
                    >
                    <Link  style={{display: this.props.showHome}} to="/momocad/shop/messages">Home</Link>
                    </Navbar.Link>
                    <Navbar.Link href="/navbars">
                    <CartSummary {...this.props } />
                    </Navbar.Link>
                    {
                        authService.isUserLoggedIn() ?
                        <Navbar.Link style={{cursor: 'pointer'}} onClick={() => this.handleLogout(authService)}>
                    Logout
                    </Navbar.Link> :
                    <Navbar.Link style={{cursor: 'pointer'}}  onClick={() => this.props.handleLoginModal()}>
                    Login
                    </Navbar.Link>
                    }
                   {
                    authService.isUserLoggedIn() ? 
                    <Navbar.Link style={{cursor: 'pointer'}}  onClick={() => 
                        alert('Under construction.')}>
                        My Orders
                    </Navbar.Link> :
                     <Navbar.Link style={{cursor: 'pointer'}} onClick={() => 
                        this.props.handleRegisterUserClickEvent()}>
                        Register
                     </Navbar.Link>
                   }
                </Navbar.Collapse>
                </Navbar>
            <NavigationBanner {...this.props}  display={ this.props.display }/>
             </>

        )
    }
}