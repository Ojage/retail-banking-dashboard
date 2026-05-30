import { describe, it, expect, jest, beforeAll } from "@jest/globals";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

import { renderWithProviders } from "../utils/renderWithProviders";

expect.extend(toHaveNoViolations as never);

describe("LanguageSwitcher", () => {
  it("renders without crashing", () => {
    renderWithProviders(<LanguageSwitcher />);
    const triggers = screen.getAllByLabelText("Change language");
    expect(triggers.length).toBeGreaterThanOrEqual(1);
  });

  it("acceptability check has no violations", async () => {
    const { container } = renderWithProviders(<LanguageSwitcher />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
