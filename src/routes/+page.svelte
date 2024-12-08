<script lang="ts">
	import LineChart from '$lib/components/line-chart.svelte';
	import { loanData, unscheduledRepayments, plannedRepayments } from '$lib/data';
</script>

<LineChart {loanData} {unscheduledRepayments} {plannedRepayments} />
