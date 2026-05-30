import { describe, it, expect } from "@jest/globals";

import type { Transaction, TransactionType } from "@/types";

import { mockTransactions } from "../fixtures/transactions";

function filterByType(txns: Transaction[], filter: TransactionType | "All"): Transaction[] {
  if (filter === "All") {
    return txns;
  }
  return txns.filter((t) => t.type === filter);
}

function sortByDate(txns: Transaction[], order: "asc" | "desc"): Transaction[] {
  return [...txns].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return order === "asc" ? diff : -diff;
  });
}

const transactions = mockTransactions["acc-chk-001"];

describe("transaction filters", () => {
  it("filtering by Credit returns only Credit transactions", () => {
    const result = filterByType(transactions, "Credit");
    expect(result.every((t) => t.type === "Credit")).toBe(true);
  });

  it("filtering by Debit returns only Debit transactions", () => {
    const result = filterByType(transactions, "Debit");
    expect(result.every((t) => t.type === "Debit")).toBe(true);
  });

  it("filtering by All returns the full array unmodified", () => {
    const result = filterByType(transactions, "All");
    expect(result).toHaveLength(transactions.length);
  });
});

describe("transaction sorting", () => {
  it("asc returns transactions oldest-first", () => {
    const sorted = sortByDate(transactions, "asc");
    const first = new Date(sorted[0].date).getTime();
    const last = new Date(sorted[sorted.length - 1].date).getTime();
    expect(last).toBeGreaterThan(first);
  });

  it("desc returns transactions newest-first", () => {
    const sorted = sortByDate(transactions, "desc");
    const first = new Date(sorted[0].date).getTime();
    const last = new Date(sorted[sorted.length - 1].date).getTime();
    expect(first).toBeGreaterThan(last);
  });
});

describe("combined filter and sort", () => {
  it("returns filtered subset in correct order", () => {
    const filtered = filterByType(transactions, "Credit");
    const sorted = sortByDate(filtered, "asc");
    expect(sorted.every((t) => t.type === "Credit")).toBe(true);
    if (sorted.length > 1) {
      const first = new Date(sorted[0].date).getTime();
      const last = new Date(sorted[sorted.length - 1].date).getTime();
      expect(last).toBeGreaterThanOrEqual(first);
    }
  });
});

describe("empty array edge cases", () => {
  it("filter returns empty array without throwing", () => {
    expect(filterByType([], "All")).toEqual([]);
    expect(filterByType([], "Credit")).toEqual([]);
    expect(filterByType([], "Debit")).toEqual([]);
  });

  it("sort returns empty array without throwing", () => {
    expect(sortByDate([], "asc")).toEqual([]);
    expect(sortByDate([], "desc")).toEqual([]);
  });
});
