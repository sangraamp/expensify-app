// timestamps (milliseconds)
// 0 === January 1st 1970 (unix epoch)

// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
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
