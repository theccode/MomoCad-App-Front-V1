import React, {Component} from "react";
import { CategoryNavigation } from "./CategoryNavigation";

export class NavigationBanner extends Component{
    render(){
        return(
            <div style={{display: this.props.display}}>
                <div className="flex fmd:flex-row overflow-x-auto w-screen items-center justify-between dark:text-gray-400 bg-gray-800">
                    <CategoryNavigation baseUrl="/momocad/shop/messages" categories = { this.props.categories }/>
                </div>
            </div>

        )
    }
}