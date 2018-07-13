import React from 'react'
import renderer from 'react-test-renderer'

import { GotenTextField } from 'goten-react-text-field'
import { GotenForm } from '../src'
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

const time = 50

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

describe('Interaction beetwen GotenForm and GotenTextField', () => {

    it('Correct pubsub message with one GotenTextField', async () => {
        const type = 'text'
        const label = 'Text'
        const value = 'valueToSearch'
        let pubsubMessage = undefined
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        )
        pubsubMessage = component.root.findByProps({ value: 'valueToSearch'}).props._pubsub_message
        expect(pubsubMessage).toEqual(component.getInstance().pubsubMessage)
    })

    it('Correct pubsub message with multiples GotenTextField', async () => {
        const type = 'text'
        const label = 'Text'
        const value = 'valueToSearch'
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        )
        const pubsubMessage = component.getInstance().pubsubMessage
        component.root.findAllByProps({ value: value}).forEach(
            element => {
                if (element.type != 'input')
                    expect(element.props._pubsub_message).toEqual(pubsubMessage)
            }
        )
    })

    it('Correct pubsub message with multiples GotenForms', async () => {
        const type = 'text'
        const label = 'Text'
        const value = 'valueToSearch'
        const component1 = renderer.create(
                <GotenForm
                    onSucces={_ => null}
                >
                    <GotenTextField
                        value={value}
                        label={label}
                        type={type}
                    />
                    <GotenTextField
                        value={value}
                        label={label}
                        type={type}
                    />
                </GotenForm>
        )
        const component2 = renderer.create(
            <GotenForm
                onSucces={_ => null}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        )
        const pubsubMessage1 = component1.getInstance().pubsubMessage
        const pubsubMessage2 = component2.getInstance().pubsubMessage
        component1.root.findAllByProps({ value: value }).forEach(
            element => {
                if (element.type != 'input')
                    expect(element.props._pubsub_message).toEqual(pubsubMessage1)
            }
        )
        component2.root.findAllByProps({ value: value }).forEach(
            element => {
                if (element.type != 'input')
                    expect(element.props._pubsub_message).toEqual(pubsubMessage2)
            }
        )
    })

})