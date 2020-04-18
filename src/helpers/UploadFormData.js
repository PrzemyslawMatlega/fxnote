const uploadFormData = {
    setupName: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'setup_m1m5', displayValue: 'Setup M1M5'},
                {value: 'setup_m5m30', displayValue: 'Setup M5M30'},
                {value: 'setup_odwrotka', displayValue: 'Setup odwrotka'},
                {value: 'setup_other', displayValue: 'Other'}
            ]
        },
        value: 'setup_m1m5',
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

export default uploadFormData