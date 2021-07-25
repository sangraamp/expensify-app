// Expenses Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense] // or state.concat(action.expense)
		case 'REMOVE_EXPENSE':
			return state.filter((expense) => action.id !== expense.id)
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (action.id === expense.id) {
					// second object's properties will override the first's
					return { ...expense, ...action.updates }
				} else {
					return expense
				}
			})
		default:
			return state
	}
}

export default expensesReducer
