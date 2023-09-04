import { Component } from "react";
import { NavigationBar } from "../NavigationBar";
import Footer from "../Footer";
import { MomoAuthService } from "../auth/MomoAuthService";
import profile from '../../profile.png';

export class Profile extends Component{

    render(){
        const authService = new MomoAuthService();
        const userDetails = authService.getUserDetails()
        return(
            <>
                <NavigationBar {...this.props} display="none" />
                <div className="mt-4 ml-4 mr-4 h-45 border border-gray-700 rounded-lg shadow bg-gray-800 border-gray-700 m-auto p-2 text-center text-white flex flex-col justify-center items-center" >
                    <img src={profile} alt="Profile image" className="rounded-lg" width={128} height={128}/>
                    <h1 className="text-xl">{userDetails.customerName}</h1>  
                   <h5>{userDetails.customerMsisdn || userDetails.customerEmail }</h5>
                </div>
                <Footer /> 
            </>
        )

    }
}