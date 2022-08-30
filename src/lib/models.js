import { v1 } from 'uuid';
export let populateCategory = [
	new Category(v1(), 'Food and Drinks'),
	new Category(v1(), 'Transportation'),
	new Category(v1(), 'Housing'),
	new Category(v1(), 'Shopping'),
	new Category(v1(), 'Vehicle'),
	new Category(v1(), 'Grocery')
];

export let populateExpenses = [
	new Expense(v1(), 'Lunch', new Date(), populateCategory[0], 13000),
	new Expense(v1(), 'Breakfast', new Date(), populateCategory[2], 10000),
	new Expense(v1(), 'Parking', new Date('2022-08-28'), populateCategory[2], 1000),
	new Expense(v1(), 'Shopping for jeans', new Date('2022-08-26'), populateCategory[2], 1000)
];
/**
 * @param {string} name
 * @param {string} id
 */
export function Category(id, name) {
	this.id = id;
	this.name = name;
}
/**
 * @param {string} [name]
 * @param {Date} [date]
 * @param {Category} [category]
 * @param {number} [price]
 * @param {string} id
 */
export function Expense(id, name, date, category, price) {
	this.id = id;
	this.name = name;
	this.date = date;
	this.category = category;
	this.price = price;
}
