import type { LoanParameters, RedemptionPlan } from '$lib/domain';

const CORRECTION_FACTOR = 365.25 / 356.0;

export const calculatePlan = (
	loanParameters: LoanParameters,
	unscheduledRepayments: Record<string, number>,
): RedemptionPlan => {
	const { amount, rate, instalment } = loanParameters;
	const plan = [];
	let sumInstalments = 0;

	let remainder = amount;
	let month = 6;
	let year = 24;
	let item;

	while (remainder > 3 * instalment) {
		const nextYearMonth = getNextYearMonth(year, month);
		month = nextYearMonth.month;
		year = nextYearMonth.year;

		const dateKey = `${month}/${year}`;
		const date = new Date(2000 + year, month - 1);

		let instalments = 3.0 * instalment;
		const unscheduledRepayment = unscheduledRepayments[dateKey];
		if (unscheduledRepayment) {
			instalments += unscheduledRepayment * loanParameters.penitentFactor;
		}
		remainder -= instalments;
		sumInstalments += instalments;

		const interests = ((remainder * rate) / 400.0) * CORRECTION_FACTOR;
		remainder += interests;

		item = { date, instalments, interests, remainder };
		plan.push(item);
	}

	const nextYearMonth = getNextYearMonth(year, month);
	month = nextYearMonth.month;
	year = nextYearMonth.year;
	sumInstalments += remainder;
	const last = { date: new Date(2000 + year, month - 1), instalments: remainder, interests: 0, remainder: 0 };
	plan.push(last);

	return { plan, last, sumInstalments };
};

const getNextYearMonth = (year: number, month: number): { year: number; month: number } => {
	month += 3;
	if (month > 12) {
		year += 1;
		month = 3;
	}
	return { year, month };
};
