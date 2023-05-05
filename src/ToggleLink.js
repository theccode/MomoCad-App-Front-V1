import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

export class ToggleLink extends Component{
    render(){
        return <Route path={this.props.to} exact={this.props.exact} children={routeProps => {
            const baseClass = this.props.className || "p-6  dark:bg-gray-800  hover:text-white";
            const activeClass = this.props.activeClass || "text-white underline bg-red-600";
            const inActiveClass = this.props.inActiveClass || "bg-gray-500";

            const combinedClasses = `${baseClass} ${routeProps.match ? activeClass : inActiveClass}`;
            return <Link to={this.props.to} className={`${combinedClasses} text-center`}>
                {this.props.children}
            </Link>
        }} />
    }
}