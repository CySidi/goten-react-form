import React from 'react'
import renderer from 'react-test-renderer'

import { GotenTextField } from 'goten-react-text-field'
import { GotenForm } from '../src'


describe('GotenForm snapshots', () => {

    it('with onSuccess', () => {
        const tree = renderer.create(
            <GotenForm
                onSuccess={_ => null}
            />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    
    it('with onError', () => {
        const tree = renderer.create(
            <GotenForm
                onSuccess={_ => null}
                onError={_ => null}
            />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    
    it('with buttonComponent', () => {
        const tree = renderer.create(
            <GotenForm
                onSuccess={_ => null}
                buttonComponent={
                    <input
                        type='submit'
                        value='Boton'
                    />
                }
            />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    
    it('with components', () => {
        const tree = renderer.create(
            <GotenForm
                onSuccess={_ => null}
            >
                <GotenTextField
                    value={'value'}
                    label={'label'}
                    type={'text'}
                />
                <GotenTextField
                    value={'value'}
                    label={'label'}
                    type={'text'}
                />
            </GotenForm>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('with components and buttonComponent', () => {
        const tree = renderer.create(
            <GotenForm
                onSuccess={_ => null}
                buttonComponent={
                    <input
                        type='submit'
                        value='Boton'
                    />
                }
            >
                <GotenTextField
                    value={'value'}
                    label={'label'}
                    type={'text'}
                />
                <GotenTextField
                    value={'value'}
                    label={'label'}
                    type={'text'}
                />
            </GotenForm>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})