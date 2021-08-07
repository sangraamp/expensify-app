import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const now = moment()

// to be reused in both add expense and edit expense
export default class ExpenseForm extends React.Component {
	// using constructor syntax because we want to add some conditional logic to state
	constructor(props) {
		super(props)

		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			// convert to dollars and then to string
			amount: props.expense ? (props.expense.amount / 100.0).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calenderFocused: false,
			error: '',
		}
	}
	onDescriptionChange = (e) => {
		const description = e.target.value
		this.setState(() => ({ description }))
	}
	onNoteChange = (e) => {
		const note = e.target.value
		this.setState(() => ({ note }))
	}
	onAmountChange = (e) => {
		const amount = e.target.value
		// user should be able to hit delete to clear the amount
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }))
		}
	}
	onDateChange = (createdAt) => {
		// the if condition won't fire if date is empty, so essentially this is preventing us from clearing the date field
		if (createdAt) {
			this.setState(() => ({ createdAt }))
		}
	}
	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calenderFocused: focused }))
	}
	onSubmit = (e) => {
		e.preventDefault()

		if (!this.state.description || !this.state.amount) {
			this.setState(() => ({ error: 'Please provide description and amount!' }))
		} else {
			this.setState(() => ({ error: '' }))
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount) * 100, // convert to pennies
				createdAt: this.state.createdAt.valueOf(), // converting moment object to milliseconds after Unix Epoch
				note: this.state.note,
			})
		}
	}
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						placeholder="Description"
						value={this.state.description}
						onChange={this.onDescriptionChange}
						autoFocus
					/>
					{/* using a type of text to enforce only 2 digits after decimal
					using regex */}
					<input
						type="text"
						placeholder="Amount"
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>
					<SingleDatePicker
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calenderFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
						id="date-picker"
					/>
					<textarea
						value={this.state.note}
						onChange={this.onNoteChange}
						placeholder="Add a note for your expense (optional)"
					/>
					<button>Add Expense</button>
				</form>
			</div>
		)
	}
}
