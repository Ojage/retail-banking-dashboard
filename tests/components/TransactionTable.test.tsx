import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import { screen, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { setupServer } from "msw/node";

import { TransactionTable } from "@/components/features/transactions/TransactionTable";

import { handlers } from "../mocks/handlers";
import { renderWithProviders } from "../utils/renderWithProviders";

expect.extend(toHaveNoViolations as never);

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("TransactionTable", () => {
  it("renders transactions when filter is All", async () => {
    renderWithProviders(<TransactionTable />);
    await waitFor(
      () => {
        expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("has no axe violations", async () => {
    const { container } = renderWithProviders(<TransactionTable />);
    await waitFor(
      () => {
        expect(screen.getByText("Whole Foods Market")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
