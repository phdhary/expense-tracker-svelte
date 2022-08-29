<script>
	import { categories, expenses } from '$lib/stores';
	import { Category } from './models';
	import { numberToCurrency } from '$lib/utils';
	let w = expenses.getTotalSpent();
</script>

<div class="right-panel-container">
	{#each $categories as item}
		<div class="category-item">
			<div class="column">
				<div class="row">
					<div class="category-name">{item.name}</div>
					<div class="spent">{numberToCurrency(categories.getTotalSpentOf(item))}</div>
				</div>
				<progress max={w} value={categories.getTotalSpentOf(item)} />
			</div>
		</div>
	{/each}
	<a href="/add_category">Add Category</a>
</div>

<style>
	progress {
		width: 100%;
	}
	.row {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.column {
		display: flex;
		height: 100%;
		flex-direction: column;
		align-items: flex-start;
	}
	.right-panel-container {
		height: 100%;
		width: 20%;
		position: fixed;
		z-index: 1;
		top: 0;
		right: 0;
		background-color: #f9fafc;
		overflow-x: hidden;
		transition: 0.5s;
		padding-top: 60px;
		display: flex;
		justify-items: center;
		flex-direction: column;
	}
	.category-name {
		font-size: 13px;
	}
	.category-item {
		height: 10%;
		margin-left: 40px;
		margin-right: 40px;
	}
	a {
		border: none;
		margin-left: 40px;
		margin-right: 40px;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		background: #101010;
		border-radius: 8px;
	}
</style>
