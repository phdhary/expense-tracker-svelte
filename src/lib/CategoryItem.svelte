<script>
	import AddCategory from '$lib/AddCategory.svelte';
	import ModalBase from '$lib/ModalBase.svelte';
	// @ts-ignore
	import { Category } from '$lib/models';
	import { categories } from './stores/category_store';
	import { getTotalSpent } from '$lib/stores/expense_store.js';
	import { numberToCurrency } from './utils';
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
	 * @type {Category}
	 */
	export let category;
	function updateCategory() {
		modalBase.showModal();
	}
</script>

<div on:click={updateCategory} class="category-item">
	<div class="column">
		<div class="row">
			<div class="category-name">{category.name}</div>
			<div class="spent">{numberToCurrency(categories.getTotalSpentOf(category))}</div>
		</div>
		<progress max={$getTotalSpent} value={categories.getTotalSpentOf(category)} />
	</div>
</div>

<ModalBase bind:this={modalBase} {child} --modalWidth="{modalWidth}%">
	<svelte:fragment slot="child">
		<AddCategory {...category} isUpdating={true} />
	</svelte:fragment>
</ModalBase>

<style>
	.category-name {
		font-size: 13px;
	}
	.category-item {
		height: 10%;
		margin-left: 40px;
		margin-right: 40px;
	}
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
</style>
