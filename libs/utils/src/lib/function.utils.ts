export function executeAndMeasureTimePerformance(callback: unknown, args: unknown[]): string {
  if (typeof callback !== "function") throw new Error("callback is not a function");
  const startTime = performance.now();
  callback(...args);
  const endTime = performance.now();
  return ((endTime - startTime) / 1000).toFixed(2) + " seconds";
}
