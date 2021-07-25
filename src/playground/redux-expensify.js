import { createStore, combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid'

// ADD_EXPENSE
const addExpense = ({
	description = '',
	note = '',
	amount = 0,
	createdAt = 0,
} = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuidv4(),
		description,
		note,
		amount,
		createdAt,
	},
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id,
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates,
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text,
})

// SORT_BY_DATE
const sortByDate = () => ({ type: 'SORT_BY_DATE' })

// SORT_BY_AMOUNT
const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT' })

// SET_START_DATE
const setStartDate = (date) => ({ type: 'SET_START_DATE', date })

// SET_END_DATE
const setEndDate = (date) => ({ type: 'SET_END_DATE', date }) // if not provided, date will be undefined by default

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

// Filters reducer

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date', // date or amount
	startDate: undefined,
	endDate: undefined,
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return { ...state, text: action.text }
		case 'SORT_BY_AMOUNT':
			return { ...state, sortBy: 'amount' }
		case 'SORT_BY_DATE':
			return { ...state, sortBy: 'date' }
		case 'SET_START_DATE':
			return { ...state, startDate: action.date }
		case 'SET_END_DATE':
			return { ...state, endDate: action.date }
		default:
			return state
	}
}

// timestamps (milliseconds)
// 0 === January 1st 1970 (unix epoch)

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter((expense) => {
			// if startDate/endDate is undefined, it shouldn't affect the return value
			const startDateMatch =
				typeof startDate !== 'number' || expense.createdAt >= startDate
			const endDateMatch =
				typeof endDate !== 'number' || expense.createdAt <= endDate
			const textMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase())

			return startDateMatch && endDateMatch && textMatch
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				// most recent expenses up top
				return a.createdAt < b.createdAt ? 1 : -1
			} else if (sortBy === 'amount') {
				// higher amount up top
				return a.amount < b.amount ? 1 : -1
			}
			return 0
		})
}

// Store creation

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer,
	})
)

store.subscribe(() => {
	const state = store.getState()
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
	console.log(visibleExpenses)
})

const expenseOne = store.dispatch(
	addExpense({ description: 'Rent', amount: 100, createdAt: 1000 })
)
const expenseTwo = store.dispatch(
	addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 })
)

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

// store.dispatch(setStartDate(1250))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(100))
// store.dispatch(setEndDate())

const demoState = {
	expenses: [
		{
			id: '93ht4f984hfa',
			description: 'January Rent',
			note: 'This was the final payment for that address',
			amount: 54500,
			createdAt: 0,
		},
	],
	filters: {
		text: 'rent',
		sortBy: 'amount', // date or amount
		startDate: undefined,
		endDate: undefined,
	},
}
