import {Menu, Switch}  from 'antd';
import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { ToggleLink } from './ToggleLink';
import ContentLoader from 'react-content-loader';


export class CategoryNavigation extends Component {
  render(){
    if (!this.props.categories){
        return (
            <ContentLoader
            height={75}
            speed={1}
            backgroundColor={'#1F2937'}
            foregroundColor={'#999'}
            viewBox="0 0 380 70"
            style={{width: '100%'}}
        >
            {/* Only SVG shapes */}
            <rect x="80" y="17" rx="4" ry="4" width="300" height="5" />
            <rect x="80" y="40" rx="3" ry="3" width="250" height="3" />
        </ContentLoader>
        )
    }
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
