import {Menu, Switch}  from 'antd';
import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { ToggleLink } from './ToggleLink';


export class CategoryNavigation extends Component {
  render(){
    return(
        <Fragment>
            <ToggleLink  to={this.props.baseUrl} exact={true}>
                All
            </ToggleLink>
            {
                this.props.categories && this.props.categories.map(category => 
                    <ToggleLink 
                    key={category.categoryId} 
                    to={`${this.props.baseUrl}/${category.name.toLowerCase()}`}
                    >
                        { (category.name.trim()).charAt(0).toUpperCase() + (category.name.trim()).substring(1, category.name.length).toLowerCase() }
                       
                    </ToggleLink>
                )
            }
        </Fragment>
    )
}
}
