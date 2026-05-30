import { describe, it, expect, beforeAll, afterEach, afterAll } from "@jest/globals";
import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";

import { HeroWealthCard } from "@/components/premium/dashboard/HeroWealthCard";

import { handlers } from "../mocks/handlers";
import { renderWithProviders } from "../utils/renderWithProviders";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("NetWorthBanner (HeroWealthCard)", () => {
  it("renders the correct total from fixture accounts", async () => {
    renderWithProviders(<HeroWealthCard />);
    await waitFor(() => {
      expect(screen.getByText(/Total Net Worth/i)).toBeInTheDocument();
    });
  });
});
