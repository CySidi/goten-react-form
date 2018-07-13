import React from 'react'
import renderer from 'react-test-renderer'

import { GotenTextField } from 'goten-react-text-field'
import { GotenForm } from '../src'

const time = 100

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

describe('GotenForm validate tests', () => {

    it('check onSucces', async () => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
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
        ).getInstance()
        component.validate()
        await sleep(time)
        expect(component.props.onSucces).toHaveBeenCalledTimes(1)
    })

    it('check onSucces with onError', async () => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
                onError={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        ).getInstance()
        component.validate()
        await sleep(time)
        expect(component.props.onSucces).toHaveBeenCalledTimes(1)
    })

    it('check onError', async () => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
                onError={jest.fn()}
            >
                <GotenTextField
                    value={value}
                    label={label}
                    type={type}
                />
            </GotenForm>
        ).getInstance()
        component.validate()
        await sleep(time)
        expect(component.props.onSucces).toHaveBeenCalledTimes(0)
        expect(component.props.onError).toHaveBeenCalledTimes(1)
    })

    it('check error without onError', async () => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
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
        ).getInstance()
        component.validate()
        await sleep(time)
        expect(component.props.onSucces).toHaveBeenCalledTimes(0)
    })

    it('check onSucces with buttonComponent', async () => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
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
        component.root.findByType('button').props.onClick()
        await sleep(time)
        expect(component.getInstance().props.onSucces).toHaveBeenCalledTimes(1)
    })

    it('check onSucces with onError with buttonComponent', async () => {
        const type = 'text'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
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
        component.root.findByType('button').props.onClick()
        await sleep(time)
        expect(component.getInstance().props.onSucces).toHaveBeenCalledTimes(1)
    })

    it('check onError with buttonComponent', async () => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
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
        component.root.findByType('button').props.onClick()
        await sleep(time)
        expect(component.getInstance().props.onSucces).toHaveBeenCalledTimes(0)
        expect(component.getInstance().props.onError).toHaveBeenCalledTimes(1)
    })

    it('check error without onError with buttonComponent', async () => {
        const type = 'email'
        const label = 'Text'
        const value = 'it is a value'
        const component = renderer.create(
            <GotenForm
                onSucces={jest.fn()}
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
        component.root.findByType('button').props.onClick()
        await sleep(time)
        expect(component.getInstance().props.onSucces).toHaveBeenCalledTimes(0)
    })
})