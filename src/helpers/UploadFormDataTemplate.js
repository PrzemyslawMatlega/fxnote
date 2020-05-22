const uploadFormDataTemplate = {
    categoryName: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'select_1', displayValue: 'Select 1'},
                {value: 'select_2', displayValue: 'Select 2'},
                {value: 'select_3', displayValue: 'Select 3'},
                {value: 'select_other', displayValue: 'Other'}
            ]
        },
        value: 'select_1',
        validation: {},
        valid: true
    },
    numberData1: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Data Number 1',
            step: "0.1"
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    numberData2: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Data Number 2',
            step: "0.1",
            min: "0"
        },
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false
    },
    numberData3: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Data Number 3',
            step: "0.1"
        },
        value: '',
        validation: {
            required: false
        },
        valid: false,
        touched: false
    }
}

export default uploadFormDataTemplate