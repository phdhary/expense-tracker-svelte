/**
 * @param {string} [name]
 * @param {Date} [date]
 * @param {Category} [category]
 * @param {string} [detail]
 * @param {number} [amount]
 */
export function Expense(name, date, category, detail, amount) {
	this.name = name;
	this.date = date;
	this.category = category;
	this.detail = detail;
	this.price = amount;
}

/**
 * @param {string} name
 */
export function Category(name) {
	this.name = name;
}

