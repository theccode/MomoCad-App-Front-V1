import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import '../../dist/output.css'

export class ToggleLink extends Component{
    render(){
        return <Route path={this.props.to} exact={this.props.exact} children={routeProps => {
            const baseClass = this.props.className || "p-6 bg-gray-800 text-gray-400 text-xl font-semibold  hover:text-white hover:bg-gray-900 focus:bg-gray-900 focus:shadow-lg focus:text-white";
            const activeClass = this.props.activeClass || "text-white";
            // const inActiveClass = this.props.inActiveClass || "bg-gray-500";

            const combinedClasses = `${baseClass} ${routeProps.match ? activeClass : ''}`;
            return <Link to={this.props.to} className={`${combinedClasses}`}>
                {this.props.children}
            </Link>
        }} />
    }
}