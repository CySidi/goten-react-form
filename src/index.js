import React, { Component } from 'react'

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
        this.errorsCant = 0
        this.subscription = PubSub.subscribe(this.pubsubMessage + pubsubMessageResponse, (_, response) => {
            if (response) {
                this.responses ++
            } else {
                return
            }
            if(this.responses === this.gotenTextFieldCant){
                this.props.onClick(event)
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


    onClick = (event) => {
        this.responses = 0
        PubSub.publish(this.pubsubMessage, null)
    }

    render() {
        this.gotenTextFieldCant = 0
        return (
            <div>
                {this.renderComponents(this.props.children)}
                {React.cloneElement(this.props.buttonComponent, {
                    onClick: this.onClick
                })}
            </div>
        )
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscribe)
    }
}