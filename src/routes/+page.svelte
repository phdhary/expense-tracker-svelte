<script>
	// @ts-nocheck

	import ModalButton from '$lib/ModalButton.svelte';
	import ExpenseDay from '$lib/ExpenseDay.svelte';
	import ExpenseItem from '$lib/ExpenseItem.svelte';
	import RightPanel from '$lib/RightPanel.svelte';
	import { getPastExpense, getTodayExpense } from '$lib/stores/expense_store';
	import { balance } from '$lib/stores/balance_store';
	import { numberToCurrency } from '$lib/utils';
	import ModifyExpense from '$lib/ModifyExpense.svelte';

	// @ts-ignore
	let input;
	let isChangingBalance = false;
	$: trueBalance = numberToCurrency($balance);

	const addBalance = () => {
		// @ts-ignore
		balance.addBalance(parseInt(input.value));
		// @ts-ignore
		input.value = '';
		isChangingBalance = false;
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1 class="title">Expenses Tracker</h1>
<section class="expense-section">
	<RightPanel />
	<h1>Your balance is {trueBalance}</h1>
	{#if isChangingBalance}
		<form on:submit|preventDefault={addBalance}>
			<input class="input" type="number" bind:this={input} required />
			<button class="black-button" type="submit">Add balance</button>
		</form>
	{:else}
		<button class="black-button" on:click={() => (isChangingBalance = true)}>Add balance</button>
	{/if}

	<ModalButton name={'Add Expense'} child={ModifyExpense} />
	
	<div class="expense-list">
		<ExpenseDay title="Today" />
		{#each $getTodayExpense as expense}
			<ExpenseItem {expense} />
		{/each}

		<ExpenseDay title="Some days ago" />
		{#each $getPastExpense as expense}
			<ExpenseItem {expense} />
		{/each}
	</div>
</section>

<style>
	@import '$lib/styles/button.css';
	@import '$lib/styles/input.css';
	form {
		width: 70%;
		display: flex;
		justify-items: center;
		justify-content: space-between;
	}
	.input {
		padding-left: 20px;
	}
	.title {
		font-weight: 600;
		font-size: 40px;
		display: flex;
		text-align: start;
	}
	.expense-list {
		display: flex;
		flex-direction: column;
		justify-items: stretch;
	}
	.expense-section {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: flex-start;
		flex: 1;
	}
</style>
