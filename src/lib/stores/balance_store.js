import { writable } from 'svelte/store';

function createBalance() {
	let initBalance = 500000;
	const { subscribe, update, set } = writable(initBalance);
	return {
		subscribe,
		addBalance: (/** @type {number} */ amount) => update((value) => (value += amount)),
		substractBalance: (/** @type {number} */ amount) => update((value) => (value -= amount)),
		resetBalance: () => set(0)
	};
}

export const balance = createBalance();
