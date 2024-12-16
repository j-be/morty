<script lang="ts">
	import {} from '$lib/store';
	import Repayments from './repayments.svelte';
</script>

<div class="two-columns">
	<div>
		<h1>Unscheduled Repayments</h1>
		<Repayments list="unscheduled" />
	</div>

	<div>
		<h1>Planned Repayments</h1>
		<Repayments list="planned" />
	</div>
</div>

<style lang="sass">
	.two-columns
		display: grid
		grid-template-columns: 1fr 1fr
		gap: var(--pico-spacing)
</style>
