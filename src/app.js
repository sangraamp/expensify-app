import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux'
import { addExpense } from './actions/expenses'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css' /* to reset the starting points for different browsers */
import './styles/styles.scss'

const store = configureStore()

store.dispatch(
	addExpense({ description: 'Water bill', amount: 100, createdAt: 1000 })
)
store.dispatch(
	addExpense({ description: 'Gas bill', amount: 300, createdAt: 100 })
)
store.dispatch(
	addExpense({ description: 'Rent', amount: 109500, createdAt: 500 })
)

const state = store.getState()

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))
