import React, {Fragment} from 'react'
import Input from '../Input/Input';

export default function InputsInPost(props) {
    const formElementsArray = [];
    for (let key in props.uploadFormData) {
        formElementsArray.push({id: key, config: props.uploadFormData[key]});
    }

    let allInputs = formElementsArray.map(formElement => (<Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => props.inputChangedHandler(event, formElement.id)}
                />));

    return (<Fragment>

        {allInputs}
    </Fragment>)
}
