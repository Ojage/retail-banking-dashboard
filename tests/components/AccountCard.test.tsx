import { describe, it, expect } from "@jest/globals";
import { screen } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";

import { PremiumAccountCard } from "@/components/premium/dashboard/PremiumAccountCard";

import { mockAccounts } from "../fixtures/accounts";
import { renderWithProviders } from "../utils/renderWithProviders";

expect.extend(toHaveNoViolations as never);

describe("PremiumAccountCard", () => {
  it("renders account name", () => {
    renderWithProviders(<PremiumAccountCard account={mockAccounts[0]} index={0} />);
    expect(screen.getByText("Checking Account")).toBeInTheDocument();
  });

  it("renders masked number without full account number", () => {
    renderWithProviders(<PremiumAccountCard account={mockAccounts[0]} index={0} />);
    expect(screen.getByText(/^\*\*\*\*\d/)).toBeInTheDocument();
    expect(screen.queryByText("4821")).not.toBeInTheDocument();
  });

  it("renders balance formatted with locale currency", () => {
    renderWithProviders(<PremiumAccountCard account={mockAccounts[0]} index={0} />, {
      preloadedState: {
        ui: {
          locale: "en",
          selectedAccountId: null,
          transactionFilter: "All",
          transactionSortOrder: "desc",
        },
      },
    });
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });
});
