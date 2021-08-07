// timestamps (milliseconds)
// 0 === January 1st 1970 (unix epoch)

import moment from 'moment'

// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter((expense) => {
			const createdAtMoment = moment(expense.createdAt)
			// if startDate/endDate is undefined, it shouldn't affect the return value
			const startDateMatch = startDate
				? startDate.isSameOrBefore(createdAtMoment, 'day')
				: true
			const endDateMatch = endDate
				? endDate.isSameOrAfter(createdAtMoment, 'day')
				: true
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
