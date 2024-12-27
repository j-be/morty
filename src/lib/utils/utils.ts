export const formatNumber = (value: number, digits = 2) =>
	value.toLocaleString(undefined, {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	});

export const merge = (one: Record<string, number>, other: Record<string, number>): Record<string, number> => {
	const ret: Record<string, number> = {};

	for (const key in one) {
		ret[key] = one[key] + (other[key] ?? 0);
	}
	for (const key in other) {
		if (!(key in one)) {
			ret[key] = other[key];
		}
	}

	return ret;
};
