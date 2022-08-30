<script>
	// @ts-ignore
	import { Expense } from '$lib/models';
	import { numberToCurrency, dateToTime } from '$lib/utils';
	import ModalBase from './ModalBase.svelte';
	import ModifyExpense from './ModifyExpense.svelte';
	import { expenses } from './stores/expense_store';

	/**
	 * @type {ModalBase}
	 */
	let modalBase;
	/**
	 * @type {any}
	 */
	export let child;
	export let modalWidth = 28;

	/**
    @type {Expense} */
	export let expense;
	function updateExpense() {
		modalBase.showModal();
	}

	function deleteExpense() {
		expenses.deleteExpense(expense);
	}
</script>

<div class="row">
	<div on:dblclick={deleteExpense} on:click={updateExpense} class="expense-item-container">
		<div class="column">
			<div class="category">{expense.category?.name}</div>
			<div class="subtitle">
				<div>
					{dateToTime(
						// @ts-ignore
						expense.date
					)} • {expense.name}
				</div>
			</div>
		</div>
		<div class="price">
			-{numberToCurrency(
				// @ts-ignore
				expense.price
			)}
		</div>
	</div>
	<button on:click={deleteExpense} class="deletebtn">
		<i class="fa fa-trash-o" />
	</button>
</div>

<ModalBase bind:this={modalBase} {child} --modalWidth="{modalWidth}%">
	<svelte:fragment slot="child">
		<ModifyExpense isUpdating={true} {...expense} />
	</svelte:fragment>
</ModalBase>

<style>
	.row:hover > .deletebtn {
		display: flex;
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.deletebtn {
		display: none;
		background-color: transparent;
		border: none;
		color: red;
		font-size: 40px;
	}
	.price {
		font-size: 16px;
		font-weight: 600;
	}
	.expense-item-container {
		display: flex;
		flex-direction: row;
		/* justify-content: space-around; */
		width: 600px;
		background-color: white;
		margin-top: 12px;
		margin-bottom: 12px;
		justify-items: start;
		justify-content: space-between;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
	.subtitle {
		opacity: 0.5;
		color: #404852;
		font-size: 14px;
		font-weight: 400;
		min-width: 500px;
		max-width: 500px;
	}
	.category {
		font-size: 16px;
		font-weight: 500;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: start;
	}
</style>
