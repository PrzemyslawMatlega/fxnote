const cleanFilters ={
    dateStart:{
        elementType: 'input',
        elementConfig: {
            type: 'date',
            min: '2020-01-01'
        },
        value: '2020-01-01',
    },
    dateEnd:{
        elementType: 'input',
        elementConfig: {
            type: 'date',
            min: '2020-01-01'
        },
        value: '2020-12-12',
    },
    setupName:{
        elementType: 'checkbox',
        elementConfig: {
            options: [
                {value: 'setup_1', displayValue: 'Setup 1'},
                {value: 'setup_2', displayValue: 'Setup 2'},
                {value: 'setup_3', displayValue: 'Setup 3'},
            ]
        },
        value: ['setup_1'],
    },
    profitRange: {
        active: false,
        start: -100,
        end: 100
    }
}

export default cleanFilters