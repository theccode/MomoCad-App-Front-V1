import { Component, Fragment } from "react";
import { GetMessages } from "./ValidationMessages";
import { ValidationError } from "./ValidationError";

export class ValidatedForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            validationErrors: {}
        }
        this.formElements = {}
    }

    handleSubmit = () => {
        this.setState(state =>{
            const newState = { ...state, validationErrors: {}}
            Object.values(this.formElements).forEach(elem => {
                if (!elem.checkValidity()){
                    newState.validationErrors[elem.name] = GetMessages(elem);
                }
            })
            return newState;
        }, () => {
            if (Object.keys(this.state.validationErrors).length === 0){
                const data = Object.assign(...Object.entries(this.formElements).map(e => ({[e[0]]: e[1].value})))
                this.props.submitCallback(data);
            }
        });
    }


    registerRef = (element) => {
        if (element !== null){
            this.formElements[element.name] = element;
        }
    }

    renderElement = (modelItem) => {
        const name = modelItem.name || modelItem.label.toLowerCase();
        return <div className="" key ={ modelItem.label }>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{ modelItem.label }</label>
                <ValidationError errors={ this.state.validationErrors[name] } />
                <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                name={ name } 
                ref={ this.registerRef }
                { ...this.props.defaultAttrs }
                { ...modelItem.attrs }
                />
        </div>
    }

    render(){
        return <Fragment>
            { this.props.formModel.map(m => this.renderElement(m))}
            <div className="grid grid-cols-3 gap-4 content-evenly">
                <button className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center"
                onClick={ this.props.cancelCallback}
                >
                    { this.props.cancelText || 'Cancel'}
                </button>
                <button className="m-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={ this.handleSubmit }>
                    { this.props.submitText || 'Submit'}
                </button>
            </div>
        </Fragment>
    }
}