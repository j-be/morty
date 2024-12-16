<script>
	import { loanDataStore } from '$lib/store';

	let showModal = $state(false);
	let { amount, instalment, rate, penitentFactor } = $loanDataStore.parameters;

	const hide = () => (showModal = false);
	const save = () => {
		loanDataStore.update((current) => ({
			...current,
			parameters: { amount, instalment, rate, penitentFactor },
		}));
		hide();
	};
</script>

<button onclick={() => (showModal = true)}> Settings</button>

<dialog open={showModal}>
	<article>
		<header>
			<button aria-label="Close" rel="prev" onclick={hide}></button>
			<strong>Settings</strong>
		</header>

		<fieldset>
			<label>
				Amount
				<input type="number" bind:value={amount} placeholder="Amount" aria-label="Amount" />
			</label>
			<label>
				Rate [%]
				<input type="number" bind:value={rate} placeholder="Rate" aria-label="Rate" />
			</label>
			<label>
				Instalment
				<input type="number" bind:value={instalment} placeholder="Instalment" aria-label="Instalment" />
			</label>
			<label>
				Penitent Factor [%]
				<input type="number" bind:value={penitentFactor} placeholder="Penitent Factor" aria-label="Penitent Factor" />
			</label>
		</fieldset>

		<footer>
			<button class="secondary" onclick={hide}>Cancel</button>
			<button onclick={save}>Save</button>
		</footer>
	</article>
</dialog>
