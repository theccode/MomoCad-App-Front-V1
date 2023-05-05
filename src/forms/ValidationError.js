import { Component } from "react";

export class ValidationError extends Component{
    render(){
        if (this.props.errors){
            return this.props.errors.map(err =>
                    <h6 className="text-red-600" key={ err }>
                        { err }
                    </h6>
                )
        }
        return null;
    }
}