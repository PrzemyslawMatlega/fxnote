const uploadFormDataTemplate = {
    setupName: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'setup_1', displayValue: 'Setup 1'},
                {value: 'setup_2', displayValue: 'Setup 2'},
                {value: 'setup_3', displayValue: 'Setup 3'},
                {value: 'setup_other', displayValue: 'Other'}
            ]
        },
        value: 'setup_1',
        validation: {},
        valid: true
    },
    profit: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Profit',
            step: "0.1"
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    },
    takeProfit: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Take profit',
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
    stopLoss: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Stop loss',
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