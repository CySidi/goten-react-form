import React from 'react'
import renderer from 'react-test-renderer'

import { PubSub } from 'pubsub-js'

import { GotenTextField } from 'goten-react-text-field'
import { GotenForm } from '../src'


const messageResponse = '_RESPONSE'
let actualMessage = 0
let pubsub = undefined

function executeWhenAllMessagesAreRecived(message, numberOfmessages, code) {
    pubsub = PubSub.subscribe(message + messageResponse, _ => {
        ++actualMessage
        if (actualMessage == numberOfmessages) {
            code()
        }
    })
}

describe('GotenForm validate tests', () => {
 
    afterEach(() => {
        if (pubsub)
            PubSub.unsubscribe(pubsub)
        actualMessage = 0
        pubsub = undefined
    })

    it('check onSuccess', done => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        ).getInstance()
        executeWhenAllMessagesAreRecived(component.pubsubMessage, component.gotenTextFieldCant, _ => {
            expect(component.props.onSuccess).toHaveBeenCalledTimes(1)
            done()
        })
        component.validate()
    })

    it('check onSuccess with onError', done => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
                onError={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        ).getInstance()
        executeWhenAllMessagesAreRecived(component.pubsubMessage, component.gotenTextFieldCant, _ => {
            expect(component.props.onSuccess).toHaveBeenCalledTimes(1)
            done()
        })
        component.validate()
    })

    it('check onError', done => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
                onError={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        ).getInstance()
        executeWhenAllMessagesAreRecived(component.pubsubMessage, component.gotenTextFieldCant, _ => {
            expect(component.props.onSuccess).toHaveBeenCalledTimes(0)
            expect(component.props.onError).toHaveBeenCalledTimes(1)
            done()
        })
        component.validate()
    })

    it('check error without onError', done => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        ).getInstance()
        executeWhenAllMessagesAreRecived(component.pubsubMessage, component.gotenTextFieldCant, _ => {
            expect(component.props.onSuccess).toHaveBeenCalledTimes(0)
            done()
        })
        component.validate()
    })

    it('check onSuccess with buttonComponent', done => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
                buttonComponent={
                    <button
                        value='Boton'
                    />
                }
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        )
        const componentInstance = component.getInstance()
        executeWhenAllMessagesAreRecived(componentInstance.pubsubMessage, componentInstance.gotenTextFieldCant, _ => {
            expect(componentInstance.props.onSuccess).toHaveBeenCalledTimes(1)
            done()
        })
        component.root.findByType('button').props.onClick()
    })

    it('check onSuccess with onError with buttonComponent', done => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
                onError={jest.fn()}
                buttonComponent={
                    <button
                        value='Boton'
                    />
                }
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        )
        const componentInstance = component.getInstance()
        executeWhenAllMessagesAreRecived(componentInstance.pubsubMessage, componentInstance.gotenTextFieldCant, _ => {
            expect(componentInstance.props.onSuccess).toHaveBeenCalledTimes(1)
            done()
        })        
        component.root.findByType('button').props.onClick()
    })

    it('check onError with buttonComponent', done => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
                onError={jest.fn()}
                buttonComponent={
                    <button
                        value='Boton'
                    />
                }
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        )
        const componentInstance = component.getInstance()
        executeWhenAllMessagesAreRecived(componentInstance.pubsubMessage, componentInstance.gotenTextFieldCant, _ => {
            expect(componentInstance.props.onSuccess).toHaveBeenCalledTimes(0)
            expect(componentInstance.props.onError).toHaveBeenCalledTimes(1)
            done()
        })
        component.root.findByType('button').props.onClick()
    })

    it('check error without onError with buttonComponent', done => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSuccess={jest.fn()}
                buttonComponent={
                    <button
                        value='Button'
                    />
                }
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        )
        const componentInstance = component.getInstance()
        executeWhenAllMessagesAreRecived(componentInstance.pubsubMessage, componentInstance.gotenTextFieldCant, _ => {
            expect(componentInstance.props.onSuccess).toHaveBeenCalledTimes(0)
            done()
        })        
        component.root.findByType('button').props.onClick()
    })
})