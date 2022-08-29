<script>
	import { Expense } from '$lib/models';
	import { expenses, categories } from '$lib/stores';
	import { dateToTime } from '$lib/utils';
	import { goto } from '$app/navigation';
	let { name, category, detail, date, price } = new Expense();
	let submitted = false;
	function addExpense() {
		const e = new Expense(name, new Date(), category, detail, price);
		expenses.addExpense(e);
		goto('/');
	}

	/**
	 * @param {any} e
	 */
</script>

<h1>Add Expense</h1>
<form class:submitted on:submit|preventDefault={addExpense}>
	<label for="name">What is this?</label>
	<input type="text" bind:value={name} required />
	<label for="detail">Some detail?</label>
	<input type="text" bind:value={detail} required />
	<label for="categories">Please select one category</label>
	<select bind:value={category} required>
		{#each $categories as item}
			<option value={item}>{item.name}</option>
		{/each}
	</select>
	<label for="price">price</label>
	<input type="number" bind:value={price} />

	<button type="submit">Save</button>
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
	button {
		width: 100%;
		border: none;
		margin-left: 40px;
		margin-right: 40px;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		font-size: 16px;
		background: #101010;
		border-radius: 8px;
		margin-top: 40px;
	}
	
	input,select {
		width: 100%;
		border-radius: 5px;
		border: none;
		background-color: #edf0f6;
	}
	select{
		padding-top: 10px;
		padding-bottom: 10px;
	}
</style>
