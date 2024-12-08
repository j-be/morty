export interface RedemptionPlan {
	readonly plan: RedemptionPlanItem[];
	readonly last: RedemptionPlanItem;
	readonly sumInstalments: number;
}

export interface RedemptionPlanItem {
	readonly date: Date;
	readonly instalments: number;
	readonly interests: number;
	readonly remainder: number;
}

export interface LoanParameters {
	readonly amount: number;
	readonly rate: number;
	readonly instalment: number;
	readonly penitentFactor: number;
}
