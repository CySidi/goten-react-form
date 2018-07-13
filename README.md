# Goten Form

**Goten Form** is a **react component** that facilitates the validation of the **Goten components**.

## Index

- [**Install**](#install)
- [**Usage**](#usage)
- [**Example of use**](#example-of-use)
- [**Props**](#props)
- [**Methods**](#methods)
- [**Contributions**](#contributions)

## Install

```npm install -s goten-react-form```

## Usage

``` jsx
var GotenForm = require('goten-react-form').GotenForm; // ES5
 
import { GotenForm } from 'goten-react-form'; // ES6


<GotenForm
    onSucces = {() => console.log("onSuccesMethod")}
/>
    <Component1>
        <GotenComponent/>
    </Component1>
    <GotenComponent/>
    <Component2/>
</GotenForm>
```

## Example of use

### With buttonComponent

``` jsx
import React, { Component } from 'react'
import { GotenTextField } from 'goten-react-text-field'
import { GotenForm } from 'goten-react-from'

export default class App extends Component {
    render() {
        return (
            <GotenForm
                onSucces = {()=> console.log("SUCCES")}
                onError = {() => console.log("ERROR")}
                buttonComponent = {
                    <input
                        type='submit'
                        value='Validate Form'
                    />
                }
            >
                <div className='title'>TITLE</div>
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
                                />
                            </th>
                            <th className='item'>
                                <GotenTextField
                                    placeholder={'Insert a email'}
                                    label={'Email'}
                                    type={'email'}
                                    showError={true}
                                />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </GotenForm>
        )
    }
}
```

### Without buttonComponent

``` jsx
import React, { Component } from 'react'
import { GotenTextField } from 'goten-react-text-field'
import { GotenForm } from 'goten-react-from'

export default class App extends Component {
    this.refForm = React.createRef()

    render() {
        return (
            <GotenForm
                onSucces = {() => console.log("SUCCES")}
                onError = {() => console.log("ERROR")}
                ref = {this.refForm}
            >
                <div className='title'>TITLE</div>
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
                                />
                            </th>
                            <th className='item'>
                                <GotenTextField
                                    placeholder={'Insert a email'}
                                    label={'Email'}
                                    type={'email'}
                                    showError={true}
                                />
                            </th>
                        </tr>
                    </tbody>
                </table>
                <input
                    type='submit'
                    value='Validate Form'
                    onClick={() => this.refForm.current.validate()}
                />
            </GotenForm>
        )
    }
}
```

## Props

| Prop Name       | Type      | Default | Required | Description                                                                  |
|-----------------|-----------|---------|----------|------------------------------------------------------------------------------|
| onSucces        | Function  |         | True     | This function is executed when all Goten components are validated correctly. |
| onError         | Function  |         | False    | This function is executed when all Goten components are validated correctly. |
| buttonComponent | Component |         | False    | Component that will be clicked.                                              |

## Methods

- **validate()**

Validate all **Goten components** inside the **GotenForm**.

## Contributions

To contribute to this package, we propose the following workflow:
1. Add an issue with related tags to describe the contribution (is it a bug?, a feature request?).
2. Branch your solution from develop, with the name as ```#<issue_number>_<descriptive_name>```.
3. Send a pull request and wait for approval/corrections.
