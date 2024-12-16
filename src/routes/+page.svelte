<script lang="ts">
	import LineChart from '$lib/components/line-chart.svelte';
	import UnscheduledRepayments from '$lib/components/unscheduled-repayments.svelte';
	import { loanDataStore, unscheduledRepayments, plannedRepayments } from '$lib/store';
</script>

<article>
	<LineChart
		loanData={$loanDataStore.parameters}
		unscheduledRepayments={$unscheduledRepayments}
		plannedRepayments={$plannedRepayments}
	/>
</article>

<article>
	<UnscheduledRepayments />
</article>
