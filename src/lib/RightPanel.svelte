<script>
// @ts-nocheck

	import { numberToCurrency } from '$lib/utils';
	import AddCategory from './ModifyCategory.svelte';
	import CategoryItem from './CategoryItem.svelte';
	import ModalBase from './ModalBase.svelte';
	import ModalButton from './ModalButton.svelte';
	import { categories } from './stores/category_store';
	import { getTotalSpent } from './stores/expense_store';

	/**
	 * @type {ModalBase}
	 */
	let modalBase;

	/**
	 * @type {any}
	 */
	export let child;
	export let modalWidth = 28;
	function updateCategory() {
		modalBase.showModal();
	}
</script>

<div class="right-panel-container">
	<h1>Total Spent {numberToCurrency($getTotalSpent)}</h1>
	<div class="category-container">
		{#each $categories as category}
			<CategoryItem {category} />
		{/each}
	</div>
	<div class="btn">
		<ModalButton name={'Add Category'} child={AddCategory} />
	</div>
</div>

<ModalBase bind:this={modalBase} {child} --modalWidth="{modalWidth}%">
	<svelte:fragment slot="child">
		<AddCategory isUpdating={true} />
	</svelte:fragment>
</ModalBase>

<style>
	.btn {
		margin-left: auto;
		margin-right: auto;
	}

	.category-container {
		overflow-y: auto;
		height: 60%;
		display: flex;
		justify-items: center;
		flex-direction: column;
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
</style>
