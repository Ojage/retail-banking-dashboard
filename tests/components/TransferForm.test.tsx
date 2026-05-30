import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { setupServer } from "msw/node";

import { TransferForm } from "@/components/features/transfer/TransferForm";

import { handlers, resetAccountsState } from "../mocks/handlers";
import { renderWithProviders } from "../utils/renderWithProviders";

expect.extend(toHaveNoViolations as never);

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetAccountsState();
});
afterAll(() => server.close());

describe("TransferForm", () => {
  it("renders three fields: from, to, and amount", () => {
    renderWithProviders(<TransferForm />);
    expect(screen.getByLabelText(/From Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
  });

  it("has no axe violations in default state", async () => {
    const { container } = renderWithProviders(<TransferForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
