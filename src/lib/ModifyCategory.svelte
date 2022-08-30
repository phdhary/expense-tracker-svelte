<script>
	import { Category } from '$lib/models';
	import { categories } from '$lib/stores/category_store';
	import { v1 } from 'uuid';

	export let isUpdating = false;
	let submitted = false;

	// @ts-ignore
	export let { id, name } = new Category();

	function addCategory() {
		id = v1();
		const e = new Category(id, name);
		categories.addCategory(e);
		submitted = true;
	}
	function updateCategory() {
		const e = new Category(id, name);
		categories.updateCategory(e);
		submitted = true;
	}
</script>

<h1>{isUpdating ? 'Update' : 'Add'} Category</h1>

<form class:submitted on:submit|preventDefault={isUpdating ? updateCategory : addCategory}>
	<label for="name">Enter category name</label>
	<input class="input" type="text" bind:value={name} required />

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
	.input {
		width: 100%;
	}
</style>
