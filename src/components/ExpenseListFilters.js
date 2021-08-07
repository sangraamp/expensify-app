import React from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import {
	setEndDate,
	setStartDate,
	setTextFilter,
	sortByAmount,
	sortByDate,
} from '../actions/filters'

class ExpenseListFilters extends React.Component {
	state = {
		calenderFocused: null,
	}
	onDatesChange = ({ startDate, endDate }) => {
		this.props.dispatch(setStartDate(startDate))
		this.props.dispatch(setEndDate(endDate))
	}
	onFocusChange = (calenderFocused) => {
		this.setState(() => ({ calenderFocused }))
	}
	render() {
		return (
			<div>
				<input
					type="text"
					value={this.props.filters.text}
					onChange={(e) => {
						// event handler for when the input text changes
						this.props.dispatch(setTextFilter(e.target.value))
					}}
				/>
				<select
					value={this.props.filters.sortBy}
					onChange={(e) => {
						if (e.target.value === 'date') {
							this.props.dispatch(sortByDate())
						} else if (e.target.value === 'amount') {
							this.props.dispatch(sortByAmount())
						}
					}}
				>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
					startDate={this.props.filters.startDate}
					endDate={this.props.filters.endDate}
					onDatesChange={this.onDatesChange}
					focusedInput={this.state.calenderFocused}
					showClearDates={true}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false /* we want to include all dates */}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		filters: state.filters,
	}
}

export default connect(mapStateToProps)(ExpenseListFilters)
