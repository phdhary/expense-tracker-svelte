<script>
	import ModalBase from './ModalBase.svelte';
	/**
	 * @type {ModalBase}
	 */
	let modalBase;
	export let name = 'Please name this button';
	/**
	 * @type {any}
	 */
	export let child;
	export let modalWidth = 28;
</script>

<button class="black-button" on:click={() => modalBase.showModal()}>{name}</button>

<ModalBase bind:this={modalBase} {child} --modalWidth="{modalWidth}%" />
