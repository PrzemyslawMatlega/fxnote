import React from 'react'
import Input from '../Input/Input';
import Button from '../../Button/Button';
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
        <div className="filterForm" onSubmit={props.applyFilters}>
            <h2 className="filterForm__head">Filters</h2>
            <form>
                <div className="form-row">
                    <h3 className="filterForm__headline">Beginning date</h3>
                    {InputsByInputComponent[0]}
                </div>
                <div className="form-row">
                    <h3 className="filterForm__headline">End date</h3>
                    {InputsByInputComponent[1]}
                </div>
                <div className="form-row">
                    <h3 className="filterForm__headline">Category</h3>
                    {InputsByInputComponent[2]}
                </div>
                <Button btnClass="Upload">APPLY</Button>
            </form>
        </div>
    )
}
