import { writable, get } from 'svelte/store';
import { Category, populateCategory } from '$lib/models';
import { expenses } from './expense_store';

function createCategory() {
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
			let index = categories.findIndex((v) => {
				return v.id === category.id;
			});
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
		let sum = 0;
		get(expenses).forEach((e) => {
			if (e.category?.name === category.name) {
				// @ts-ignore
				sum += e.price;
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
