import React, { Component } from "react";
import { NavigationBar } from "../NavigationBar";
import { Link } from "react-router-dom";
import { runFireworks } from "../../utils/utils";
import Footer from "../Footer";
import { MomoAuthService } from "../auth/MomoAuthService";

export class Thanks extends Component{
    componentDidMount(){
        const authService = new MomoAuthService();
        runFireworks();
        this.props.clearCart();
        authService.removeMomocad();
        authService.removeTransaction();
    }
    render(){
        return <>
            <NavigationBar { ...this.props } display='none'/>
            <div className="flex flex-col justify-center items-center text-white">
                <div className="m-2 text-center">
                    <h1 className="text-5xl mb-2 text-green-600">Congratulations!</h1>
                    <p>Thanks for placing your order.</p>
                    <p className="mb-2">We wish you the best!</p>
                    <Link to="/momocad" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800 mt-2">
                        Return to Store
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    }
}