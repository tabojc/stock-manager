export function roundToN(num = 0, decimals = 2) {
  if (typeof num !== "number" || isNaN(num)) return NaN;
  if (typeof decimals !== "number" || isNaN(num)) return NaN;

  return +(Math.round(num + "e" + decimals) + "e-" + decimals);
}
