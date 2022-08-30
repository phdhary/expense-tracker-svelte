<script>
	import { Expense } from '$lib/models';
	import { expenses } from '$lib/stores/expense_store';
	import { categories } from '$lib/stores/category_store';
	import { v1 } from 'uuid';

	export let isUpdating = false;
	let submitted = false;

	// @ts-ignore
	export let { id, name, date, category, price } = new Expense();

	function addExpense() {
		id = v1();
		const e = new Expense(id, name, new Date(), category, price);
		expenses.addExpense(e);
		submitted = true;
	}
	function updateExpense() {
		const e = new Expense(id, name, new Date(), category, price);
		expenses.updateExpense(e);
		submitted = true;
	}
</script>

<h1>{isUpdating ? 'Update' : 'Add'} Expense</h1>

<form class:submitted on:submit|preventDefault={isUpdating ? updateExpense : addExpense}>
	<label for="name">What are you spending on?</label>
	<input class="input" type="text" bind:value={name} required />

	<label for="categories">Please select one category</label>
	<select class="input" bind:value={category} required>
		{#each $categories as item}
			<option value={item}>{item.name}</option>
		{/each}
	</select>

	<label for="price">Price</label>
	<input class="input" type="number" bind:value={price} />

	<button on:submit|preventDefault class="black-button" type="submit">Save</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
		margin: auto;
	}
	label {
		margin-top: 20px;
		margin-bottom: 4px;
	}
	select {
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.input {
		width: 100%;
	}
</style>
