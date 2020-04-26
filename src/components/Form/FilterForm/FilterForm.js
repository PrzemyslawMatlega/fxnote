import React from 'react'
import Input from '../Input/Input';
import './FilterForm.scss'

export default function FilterForm(props) {
    let InputsByInputComponent = [];
    const inputsKeys = Object.keys(props.filterData)
    
    for (let i = 0; i < 3; i++) {
        InputsByInputComponent.push((<Input
            key={inputsKeys[i]}
            elementType={props.filterData[inputsKeys[i]].elementType}
            elementConfig={props.filterData[inputsKeys[i]].elementConfig}
            value={props.filterData[inputsKeys[i]].value}
            changed={(event) => props.updateFilter(event, inputsKeys[i])}/>))
    }

    return (
        <div className="filterForm">
            <h2 className="filterForm__head">Filters</h2>
            <form>
                {InputsByInputComponent}
            
            </form>
        </div>
    )
}
