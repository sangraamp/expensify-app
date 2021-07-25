import { createStore } from 'redux'

// action generators: functions that return action objects
const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy,
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy,
})

const resetCount = () => ({
	type: 'RESET',
})

// no need to set default value for count because it is not optional
const setCount = ({ count } = {}) => ({
	type: 'SET',
	count,
})

// Reducers
// 1. Reducers are pure functions (output only depends on input and nothing else
// apart from input gets used/modified)
// 2. Never change state or action.

const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy,
			}
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy,
			}
		case 'SET':
			return {
				count: action.count,
			}
		case 'RESET':
			return {
				count: 0,
			}
		default:
			return state
	}
}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
	console.log(store.getState())
})

// dispatching actions
store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 20 }))
