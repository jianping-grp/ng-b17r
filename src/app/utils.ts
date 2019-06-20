export function toFloat(value: string) {
  const num = Number.parseFloat(value);
  if (isNaN(num)) {
    return value;
  }
  return num;
}
