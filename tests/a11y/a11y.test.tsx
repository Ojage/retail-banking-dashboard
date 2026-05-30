import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import { screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { setupServer } from "msw/node";

import { TransactionTable } from "@/components/features/transactions/TransactionTable";
import { TransferForm } from "@/components/features/transfer/TransferForm";
import { HeroWealthCard } from "@/components/premium/dashboard/HeroWealthCard";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

import { handlers } from "../mocks/handlers";
import { renderWithProviders } from "../utils/renderWithProviders";

expect.extend(toHaveNoViolations as never);

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Accessibility audit", () => {
  it("HeroWealthCard has no violations", async () => {
    const { container } = renderWithProviders(<HeroWealthCard />);
    await waitFor(() => {
      expect(screen.getByText(/Total Net Worth/i)).toBeInTheDocument();
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("TransactionTable with data has no violations", async () => {
    const { container } = renderWithProviders(<TransactionTable />);
    await waitFor(() => {
      expect(screen.getAllByText(/Debit|Credit/).length).toBeGreaterThan(0);
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("TransferForm in default state has no violations", async () => {
    const { container } = renderWithProviders(<TransferForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("LanguageSwitcher has no violations", async () => {
    const { container } = renderWithProviders(<LanguageSwitcher />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
