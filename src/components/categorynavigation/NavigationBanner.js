import React, {Component} from "react";
import { CategoryNavigation } from "./CategoryNavigation";

export class NavigationBanner extends Component{
    render(){
        return(
            <div className="border-gray-200 rounded dark:bg-gray-900 sticky  top-0 mt-2" style={{display: this.props.display}}>
                <div className="flex fmd:flex-row overflow-x-auto w-screen items-center justify-between dark:text-gray-400 dark:bg-gray-800 dark:text-gray-400 dark:bg-gray-800">
                    <CategoryNavigation baseUrl="/momocad/shop/messages" categories = { this.props.categories } />
                </div>
            </div>

        )
    }
}