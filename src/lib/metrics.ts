import { Registry, Counter } from "prom-client";

const globalForMetrics = globalThis as typeof globalThis & {
  metricsRegistry?: Registry;
  transferSuccessTotal?: Counter;
};

if (!globalForMetrics.metricsRegistry) {
  globalForMetrics.metricsRegistry = new Registry();
  globalForMetrics.transferSuccessTotal = new Counter({
    name: "transfer_success_total",
    help: "Number of successfully simulated fund transfers",
    registers: [globalForMetrics.metricsRegistry],
  });
}

export const metricsRegistry = globalForMetrics.metricsRegistry;
export const transferSuccessTotal = globalForMetrics.transferSuccessTotal!;
