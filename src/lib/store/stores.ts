import type { LoanParameters } from '$lib/domain';
import { derived, writable, type Writable } from 'svelte/store';
import { storageReadWrite } from './storage';

/*
 * Types
 */
export interface LoanData {
	parameters: LoanParameters;
}

export interface Repayment {
	month: string;
	amount: number;
}

export interface Repayments {
	unscheduled: Repayment[];
	planned: Repayment[];
}

/*
 * Helpers
 */
const createPersistentStore = <T>(name: string, initialValue: T) => {
	const [read, write] = storageReadWrite<T>(name);
	const store = writable<T>({
		...initialValue,
		...read(),
	});
	store.subscribe((val) => write(val));
	return store;
};

const collapse = (repayments: Repayment[]): Record<string, number> => {
	const ret: Record<string, number> = {};
	repayments.forEach((repayment) => (ret[repayment.month] = (ret[repayment.month] ?? 0) + repayment.amount));
	return ret;
};

/*
 * Stores
 */
export const loanDataStore: Writable<LoanData> = createPersistentStore('loadData', {
	parameters: {
		amount: 100_000,
		instalment: 1_000,
		rate: 3,
		penitentFactor: 0.5,
	},
});

export const repaymentsStore: Writable<Repayments> = createPersistentStore('repayments', {
	unscheduled: [],
	planned: [],
});

export const unscheduledRepayments = derived(repaymentsStore, (store) => collapse(store.unscheduled));
export const plannedRepayments = derived(repaymentsStore, (store) => collapse(store.planned));
