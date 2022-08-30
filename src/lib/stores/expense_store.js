import { writable,  derived } from 'svelte/store';
import { Expense, populateExpenses } from '$lib/models';
import { balance } from './balance_store';

function createExpenses() {
	const { subscribe, update, set } = writable(populateExpenses);

	/**
	 * @param {Expense} expense
	 */
	function addExpense(expense) {
		update((expenses) => (expenses = [...expenses, expense]));
		// @ts-ignore
		balance.substractBalance(expense.price);
	}

	/**
	 * @param {Expense} expense
	 */
	function updateExpense(expense) {
		update((expenses) => {
			let newArray = expenses;
			let index = expenses.findIndex((v) => {
				return v.id === expense.id;
			});
			newArray[index] = expense;
			console.log('updated? >> ' + index + expenses[index].category?.name);
			expenses = [...newArray];
			return expenses;
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

	return {
		subscribe,
		addExpense,
		updateExpense,
		deleteExpense
	};
}

export const expenses = createExpenses();

export const getPastExpense = derived(expenses, ($expenses) => {
	return $expenses.filter((v) => {
		if (
			// v.date?.getMonth() !== new Date().getMonth() &&
			v.date?.getDate() !== new Date().getDate()
		) {
			return v;
		}
	});
});

export const getTotalSpent = derived(expenses, ($expenses) => {
	let total = 0;
	$expenses.forEach((v) => {
		// @ts-ignore
		total += v.price;
	});
	return total;
});

export const getTodayExpense = derived(expenses, ($expenses) => {
	const filtered = $expenses.filter((v) => {
		if (
			v.date?.getMonth() === new Date().getMonth() &&
			v.date?.getDate() === new Date().getDate()
		) {
			return v;
		}
	});
	// @ts-ignore
	const sorted = filtered.sort((a, b) => b.date - a.date);
	return sorted;
});
