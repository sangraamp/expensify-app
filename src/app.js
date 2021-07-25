import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux'
import { addExpense } from './actions/expenses'
import { setTextFilter, sortByAmount } from './actions/filters'
import configureStore from './store/configureStore'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css' /* to reset the starting points for different browsers */
import './styles/styles.scss'

const store = configureStore()

const expenseOne = store.dispatch(
	addExpense({ description: 'Water bill', amount: 100, createdAt: 1000 })
)
const expenseTwo = store.dispatch(
	addExpense({ description: 'Gas bill', amount: 300, createdAt: -1000 })
)

store.dispatch(setTextFilter('water'))

setTimeout(() => {
	store.dispatch(setTextFilter('bill'))
}, 3000)

const state = store.getState()
console.log(getVisibleExpenses(state.expenses, state.filters))

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
