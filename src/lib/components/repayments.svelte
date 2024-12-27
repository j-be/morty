<script lang="ts">
	import type { Repayments } from '$lib/store';

	import { repaymentsStore } from '$lib/store';

	interface Props {
		list: keyof Repayments;
	}

	let { list }: Props = $props();

	let month = $state('');
	let amount = $state('');

	let monthInvalid = $derived(!month ? null : !/^(3|6|9|12)\/\d{2}$/.test(month));
	let amountInvalid = $derived(!amount ? null : !/\d+$/.test(amount));

	const add = () => {
		if (!month || monthInvalid || !amount || amountInvalid) {
			return;
		}

		repaymentsStore.update((current) => {
			const copy = { ...current };
			copy[list] = [...current[list], { month, amount: Number(amount) }];
			return copy;
		});
	};

	const remove = (indexToRemove: number) => {
		repaymentsStore.update((current) => {
			const copy = { ...current };
			copy[list] = current[list].filter((_, idx) => idx !== indexToRemove);
			return copy;
		});
	};
</script>

<table>
	<thead>
		<tr>
			<th scope="col"></th>
			<th scope="col">Month</th>
			<th scope="col">Amount</th>
		</tr>
	</thead>
	<tbody>
		{#each $repaymentsStore[list] as payment, idx}
			<tr>
				<td><button class="outline" onclick={() => remove(idx)}>-</button></td>
				<td>{payment.month}</td>
				<td>{payment.amount}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td><button onclick={add}>+</button></td>
			<td><input bind:value={month} placeholder="Month" aria-label="Month" aria-invalid={monthInvalid} /></td>
			<td><input bind:value={amount} placeholder="Amount" aria-label="Amount" aria-invalid={amountInvalid} /></td>
		</tr>
	</tfoot>
</table>

<style lang="sass">
	input
		margin: 0
</style>
