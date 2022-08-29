<script>
	import { balance, categories, expenses } from '$lib/stores';
	import { Expense, Category } from '$lib/models';
	import ExpenseItem from '$lib/ExpenseItem.svelte';
	import { numberToCurrency } from '$lib/utils';
	import RightPanel from '$lib/RightPanel.svelte';
	import ExpenseDay from '$lib/ExpenseDay.svelte';

	// @ts-ignore
	let input;
	let isChangingBalance = false;

	const addBalance = () => {
		// @ts-ignore
		balance.addBalance(parseInt(input.value));
		// @ts-ignore
		input.value = '';
		isChangingBalance = false;
	};

	const ago = $expenses.filter((v, i) => {
		if (v.date?.getDate() !== new Date().getDate()) {
			return v;
		}
	});
	const todays = $expenses.filter((v, i) => {
		if (
			// v.date?.getFullYear() === new Date().getFullYear() &&
			// v.date.getMonth() === new Date().getMonth() &&
			v.date?.getDate() === new Date().getDate()
		) {
			return v;
		}
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1 class="title">Expenses Tracker</h1>
<section class="expense-section">
	<RightPanel />
	<h1>Your balance: {numberToCurrency($balance)}</h1>
	{#if isChangingBalance}
		<form on:submit|preventDefault={addBalance}>
			<input type="number" bind:this={input} required />
			<button type="submit">Add balance</button>
		</form>
	{:else}
		<button on:click={() => (isChangingBalance = true)}>Add balance</button>
	{/if}

	<div class="expense-list">
		<ExpenseDay title="Today" />
		{#each todays as expense}
			<ExpenseItem {expense} />
		{/each}

		<ExpenseDay title="Some days ago" />
		{#each ago as expense}
			<ExpenseItem {expense} />
		{/each}
	</div>

	<a href="/add_expense">Add Expense</a>
</section>

<style>
	.title {
		font-weight: 600;
		font-size: 40px;
		display: flex;
		text-align: start;
	}
	input {
		border-radius: 5px;
		border: none;
		background-color: #edf0f6;
	}
	button,
	a {
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		background: #101010;
		margin-top: 20px;
		border-radius: 8px;
	}
	.expense-list {
		display: flex;
		flex-direction: column;
		justify-items: left;
	}
	.expense-section {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: flex-start;
		flex: 1;
	}
</style>
