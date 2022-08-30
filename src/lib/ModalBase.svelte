<script>
	/**
	 * @type {HTMLDivElement}
	 */
	var modal;
	/**
	 * @type {any}
	 */
	export let child;

	export function closeModal() {
		modal.style.display = 'none';
	}
	export function showModal() {
		modal.style.display = 'block';
	}
</script>

<div bind:this={modal} class="modal">
	<div class="modal-content">
		<span on:click={closeModal} class="close">&times;</span>
		<svelte:component this={child} />
        <slot name="child"></slot>
	</div>
</div>

<style>
	.modal {
		display: none;
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.4);
		animation-name: fadeIn;
		animation-duration: 0.4s;
	}

	.modal-content {
		background-color: #fefefe;
		/* margin: 5% auto; */
		padding: 20px;
		border: 1px solid #888;
		width: var(--modalWidth);
		bottom: 20%;
		position: fixed;
		left: 32%;
		animation-name: animateFromBottom;
		animation-duration: 0.4s;
		border-radius: 15px;
	}

	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
	/* Add Animation */
	@keyframes animateFromBottom {
		from {
			bottom: -500px;
			opacity: 0;
		}
		to {
			bottom: 20%;
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
