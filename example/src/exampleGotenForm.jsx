import React, { Component } from 'react'
import { GotenTextField } from 'goten-react-text-field'

import { GotenForm } from '../../src'

import './exampleGotenForm.css'


const stateExampleGotenForm = {
    changeOnPress: true
}

export default class ExampleGotenForm extends Component {
    constructor(props) {
        super(props)
        this.state = stateExampleGotenForm
        this.refsGotenTextFieldWithPattern = React.createRef()
        this.refsGotenTextField = {}
        this.gotenTextFields = {}
    }
    
    separator(cant=1) {
        let arrBr = []
        for (let index = 0; index < cant; index++) {
            arrBr[index] = <br key={index}/>
        }
        return(
            <div>
                { arrBr }
            </div>
        )
    }

    addGotenTextFieldRef(name, element) {
        this.refsGotenTextField[name] = element
    }

    getRow(label, addedText=''){
        const type = label.toLowerCase()
        const id = type + addedText
        return (
            <tr>
                <th className='item'>
                    <GotenTextField
                        placeholder={'insert a ' + type + '...'}
                        label={label}   // Example: 'Insert Name'
                        type={type}     // Example: 'text'
                        bindContainer={this.gotenTextFields}
                        bindProp={id}
                        ref={(element) => this.addGotenTextFieldRef(id, element)}
                    />
                </th>
                <th className='item'>
                    <GotenTextField
                        placeholder={'insert a ' + type + '...'}
                        label={label}   // Example: 'Insert Mail'
                        type={type}     // Example: 'email'
                        showError={true}
                        bindContainer={this.gotenTextFields}
                        bindProp={id + 'show'}
                        ref={(element) => this.addGotenTextFieldRef(id + 'show', element)}
                    />
                </th>
                <th className='item'>
                    <GotenTextField
                        placeholder={'insert a ' + type + '...'}
                        label={label + ' Required'}
                        type={type}
                        required={true}
                        showError={true}
                        bindContainer={this.gotenTextFields}
                        bindProp={id + 'showAndRequired'}
                        ref={(element) => this.addGotenTextFieldRef(id + 'showAndRequired', element)}
                    />
                </th>
            </tr>
        )
    }

    render() {
        return (
            <GotenForm
                onClick = { () => {
                    this.setState({ changeOnPress: !this.state.changeOnPress })
                }}
                buttonComponent = {
                    <input
                        type='submit'
                        value='Validate Form'
                    />
                }
            >
                <div className='title'> GotenTextField with default patterns</div>
                <table className= 'table'>
                    <tbody>
                        {this.getRow('Text')}
                        {this.getRow('Url')}
                        {this.getRow('Password')}
                        {this.getRow('Email')}
                        {this.getRow('Number')}
                        {this.getRow('Time')}
                        {this.getRow('InvalidType')}
                    </tbody>
                </table>
                {this.separator(2)}
                <div className='title'> GotenTextField with pattern</div>
                <table>
                    <tbody>
                        <tr>
                            <th className='item'>
                                <GotenTextField
                                    placeholder={'[0-9]{2}\/[0-9]{2}\/[0-9]{4}'}
                                    label={'Date Pattern'}
                                    type={'text'}
                                    pattern={'[0-9]{2}\/[0-9]{2}\/[0-9]{4}'}
                                    errorMessage={'Please inset a text using the correct pattern'}
                                    errorRequiredMessage={'This field is required'}
                                    required={true}
                                    showError={true}
                                    bindContainer={this.gotenTextFields}
                                    bindProp={'pattern'}
                                    ref={this.refsGotenTextFieldWithPattern}
                                />          
                            </th>
                            <th className='item'>
                                <div className='message'>{this.gotenTextFields.pattern}</div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </GotenForm>
        )
    }
}