export const dateToTime = (/** @type {Date} */ date) => {
	return date.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
};

export const numberToCurrency = (/** @type {number} */ number) => {
	return Intl.NumberFormat('id', {
		style: 'currency',
		currency: 'IDR'
	}).format(number);
};
