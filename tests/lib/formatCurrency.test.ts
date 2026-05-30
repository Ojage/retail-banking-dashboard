import { describe, it, expect } from "@jest/globals";

import { formatCurrency } from "@/lib/formatting";

describe("formatCurrency", () => {
  it("formats USD with en-US locale", () => {
    const result = formatCurrency(1234.56, "USD", "en-US");
    expect(result).toBe("$1,234.56");
  });

  it("formats EUR with fr-FR locale", () => {
    const result = formatCurrency(1234.56, "EUR", "fr-FR");
    expect(result).toContain("1");
    expect(result).toContain("234");
    expect(result).toContain("56");
    expect(result).toContain("€");
  });

  it("formats zero amount without returning empty string", () => {
    const result = formatCurrency(0, "USD", "en-US");
    expect(result).toBe("$0.00");
  });

  it("includes thousand separators for large numbers in en-US", () => {
    const result = formatCurrency(1000000, "USD", "en-US");
    expect(result).toBe("$1,000,000.00");
  });

  it("includes thousand separators for large numbers in fr-FR", () => {
    const result = formatCurrency(1000000, "EUR", "fr-FR");
    expect(result).toMatch(/1[\s\u202f]000/);
  });

  it("formats negative amounts with a minus sign", () => {
    const result = formatCurrency(-50, "USD", "en-US");
    expect(result).toBe("-$50.00");
  });
});
