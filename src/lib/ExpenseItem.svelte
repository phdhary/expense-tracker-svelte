<script>
	// @ts-ignore
	import { Expense } from '$lib/models';
	import { numberToCurrency, dateToTime } from '$lib/utils';
	import { expenses } from '$lib/stores';
	import { goto } from '$app/navigation';

	export /**
    @type {Expense}
*/
	let expense;
	function updateExpense() {
		goto('/update_expense');
	}
	function deleteExpense() {
		expenses.deleteExpense(expense);
		goto('/');
	}
</script>

<div class="expense-item-container">
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
	<button on:click={updateExpense}>Edit</button>
	<button on:click={deleteExpense}>Delete</button>
</div>

<style>
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
