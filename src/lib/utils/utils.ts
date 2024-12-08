export const formatNumber = (value: number, digits = 2) =>
	value.toLocaleString(undefined, {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits,
	});
