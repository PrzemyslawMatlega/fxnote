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
    categoryName:{
        elementType: 'checkbox',
        elementConfig: {
            options: [
                {value: 'select_1', displayValue: 'Select 1'},
                {value: 'select_2', displayValue: 'Select 2'},
                {value: 'select_3', displayValue: 'Select 3'},
                {value: 'select_other', displayValue: 'Other'}
            ]
        },
        value: ['select_1'],
    },
    profitRange: {
        active: false,
        start: -100,
        end: 100
    }
}

export default cleanFilters