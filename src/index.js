import React, { Component } from 'react'

import './gotenForm.css'
import { GotenTextField } from 'goten-react-text-field';


export class GotenForm extends Component {
    ref = undefined
    
    _validate = () => {
        const gotenTextFields = []
        this._recursiveObtainGotenTextFields(this.props.children, gotenTextFields)
        for(const gotenTextField of gotenTextFields) {
            console.log(gotenTextField)
            if (gotenTextField.validate().error)
                return true
        }
        return false
    }

    _recursiveObtainGotenTextFields(children, gotenTextFields){
        if (!children)
            return
        if (Array.isArray(children)) {
            for (const child of children) {
                this._recursiveObtainGotenTextFields(child.props.children, gotenTextFields)
            }
            return
        }
        if (children.props) {
            if (children.type.name === 'GotenTextField') {
                gotenTextFields.push(children)
                return
            }
            this._recursiveObtainGotenTextFields(children.props.children, gotenTextFields)
        }
    }

    onClick = (event) => {
        console.log('ON_CLICK')
        if( !this._validate()) {
            return
        }
        this.props.onClick(event)
    }

    render() {
        return (
            <div>
                {this.props.children}
                {React.cloneElement(this.props.buttonComponent, {
                    onClick: this.onClick
                })}
            </div>
        )
    }
}