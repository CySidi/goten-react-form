import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'

import './gotenForm.css'


const pubsubMessage = 'VALIDATE_GOTEN_COMPONENTS_'
const pubsubMessageResponse = '_RESPONSE'
let cont = 0

export class GotenForm extends Component {
    constructor(props) {
        super(props)
        this.pubsubMessage = pubsubMessage + ++cont
        this.gotenTextFieldCant = 0
        this.responses = 0
        this.errorTrue = false
        this.subscription = PubSub.subscribe(this.pubsubMessage + pubsubMessageResponse, (_, response) => {
            ++ this.responses
            if (!response) {
                this.errorTrue = true
            }
            if (this.responses === this.gotenTextFieldCant) {
                const onError = this.props.onError ? this.props.onError : _=> null
                this.errorTrue ? onError() : this.props.onSucces()
            }
        })
    }
    
    renderComponents(children) {
        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) return child
            let childProps = {}
            if (child.type.name === 'GotenTextField') {
                this.gotenTextFieldCant ++
                childProps = { _pubsub_message: this.pubsubMessage }
                return React.cloneElement(child, childProps)
            }
            childProps.children = this.renderComponents(child.props.children)
            return React.cloneElement(child, childProps)
        })
    }

    validate() {
        this.errorTrue = false
        this.responses = 0
        PubSub.publish(this.pubsubMessage, null)
    }

    onClick = (event) => {
        this.validate()
    }

    render() {
        this.gotenTextFieldCant = 0
        return (
            <div>
                {this.renderComponents(this.props.children)}
                {this.props.buttonComponent && 
                    React.cloneElement(this.props.buttonComponent, {
                    onClick: this.onClick
                })}
            </div>
        )
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscribe)
    }
}

GotenForm.propTypes = {
    buttonComponent: PropTypes.element,
    onSucces: PropTypes.func.isRequired,
    onError: PropTypes.func
}