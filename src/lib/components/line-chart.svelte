<script lang="ts">
	import type { LoanParameters, RedemptionPlanItem } from '$lib/domain';

	import * as d3 from 'd3';

	import { calculatePlan } from '$lib/logic/redemption_calculator';
	import { formatNumber } from '$lib/utils';

	interface LineChartProps {
		loanData: LoanParameters;
		unscheduledRepayments: Record<string, number>;
		plannedRepayments: Record<string, number>;
	}

	let { loanData, unscheduledRepayments, plannedRepayments }: LineChartProps = $props();

	let base = $state(calculatePlan(loanData, {}));
	let current = $state(calculatePlan(loanData, unscheduledRepayments));
	let projected = $state(calculatePlan(loanData, { ...unscheduledRepayments, ...plannedRepayments }));

	const width = 1280;
	const height = 800;
	const marginTop = 20;
	const marginRight = 20;
	const marginBottom = 30;
	const marginLeft = 60;

	let gx: SVGGElement;
	let gy: SVGGElement;

	let x = $derived(d3.scaleUtc([base.plan[0].date, base.last.date], [marginLeft, width - marginRight]));
	let y = $derived(d3.scaleLinear([0, loanData.amount], [height - marginBottom, marginTop]));

	let line = $derived(
		d3.line<RedemptionPlanItem>(
			(d) => x(d.date),
			(d) => y(d.remainder),
		),
	);
	let today = $derived(d3.line<number>(x(new Date()), y)([0, loanData.amount]));

	$effect(() => {
		d3.select(gy).call(d3.axisLeft(y));
	});
	$effect(() => {
		d3.select(gx).call(d3.axisBottom(x));
	});
</script>

<svg {width} {height}>
	<g bind:this={gx} transform="translate(0,{height - marginBottom})" />
	<g bind:this={gy} transform="translate({marginLeft},0)" />

	<path fill="none" stroke="#017FC0" stroke-width="1.5" d={today} />

	<path fill="none" stroke="#D93526" stroke-width="1.5" d={line(base.plan)} />
	<path fill="none" stroke="#398712" stroke-width="1.5" d={line(current.plan)} />
	<path fill="none" stroke="#977000" stroke-width="1.5" d={line(projected.plan)} />
</svg>

<table style="max-width: {width}px">
	<thead>
		<tr>
			<th></th>
			<th scope="col">End</th>
			<th scope="col">Sum paid</th>
		</tr>
	</thead>
	<tbody>
		{#each [{ label: 'Base', plan: base }, { label: 'Current', plan: current }, { label: 'Projected', plan: projected }] as item}
			<tr>
				<th scope="row">{item.label}</th>
				<td>{item.plan.last.date.toLocaleDateString()}</td>
				<td>{formatNumber(item.plan.sumInstalments)} €</td>
			</tr>
		{/each}
	</tbody>
</table>
