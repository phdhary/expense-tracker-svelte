import { writable, get } from 'svelte/store';
import { Category, Expense } from '$lib/models';

function createBalance() {
	const { subscribe, update, set } = writable(0);
	return {
		subscribe,
		addBalance: (/** @type {number} */ amount) => update((value) => (value += amount)),
		substractBalance: (/** @type {number} */ amount) => update((value) => (value -= amount)),
		resetBalance: () => set(0)
	};
}

function createExpenses() {
	let populateExpenses = [
		new Expense('Lunch', new Date(), new Category('Food and Drinks'), '', 13000),
		new Expense('Breakfast', new Date(), new Category('Food and Drinks'), '', 10000),
		new Expense('Parking', new Date('2022-08-28'), new Category('Shopping'), '', 1000),
		new Expense('Shopping for jeans', new Date('2022-08-26'), new Category('Shopping'), '', 1000)
	];
	const { subscribe, update } = writable(populateExpenses);

	/**
	 * @param {Expense} expense
	 */
	function addExpense(expense) {
		update((v) => (v = [...v, expense]));
		// @ts-ignore
		balance.substractBalance(expense.price);
	}

	/**
	 * @param {Expense} expense
	 */
	function updateExpense(expense) {
		update((v) => {
			let index = v.indexOf(expense);
			v[index] = expense;
			return v;
		});
	}

	/**
	 * @param {Expense} expense
	 */
	function deleteExpense(expense) {
		update((v) => {
			let index = v.indexOf(expense);
			v.splice(index, 1);
			return v;
		});
	}

	function getTotalSpent() {
		let total = 0;
		get(expenses).forEach((v) => {
			// @ts-ignore
			total += v.price;
		});
		return total;
	}
	return {
		subscribe,
		addExpense,
		updateExpense,
		deleteExpense,
		getTotalSpent
	};
}

function createCategory() {
	let populateCategory = [
		new Category('Food and Drinks'),
		new Category('Transportation'),
		new Category('Housing'),
		new Category('Shopping'),
		new Category('Vehicle'),
		new Category('Grocery')
	];
	const { subscribe, set, update } = writable(populateCategory);

	/**
	 * @param {Category} category
	 */
	function addCategory(category) {
		update((categories) => (categories = [...categories, category]));
	}
	/**
	 * @param {Category} category
	 */
	function updateCategory(category) {
		update((categories) => {
			let index = categories.indexOf(category);
			categories[index] = category;
			return categories;
		});
	}
	/**
	 * @param {Category} category
	 */
	function deleteCategory(category) {
		update((categories) => {
			let index = categories.indexOf(category);
			categories.splice(index, 1);
			return categories;
		});
	}

	/**
	 * @param {Category} category
	 */
	function getTotalSpentOf(category) {
		let count = 0;
		let sum = 0;
		get(expenses).forEach((e) => {
			if (e.category?.name === category.name) {
				// @ts-ignore
				sum += e.price;
				count++;
			}
		});
		return sum;
	}

	return {
		subscribe,
		addCategory,
		updateCategory,
		deleteCategory,
		getTotalSpentOf
	};
}

export const categories = createCategory();
export const balance = createBalance();
export const expenses = createExpenses();
