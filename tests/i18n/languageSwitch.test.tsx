import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";

import { i18n } from "@/lib/i18n";

describe("i18n integration", () => {
  it("renders with English locale and returns English values", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <div data-testid="i18n-check">{i18n.t("dashboard.title")}</div>
      </I18nextProvider>
    );
    expect(screen.getByTestId("i18n-check").textContent).toBe("Dashboard");
  });

  it("renders with French locale and returns French values", async () => {
    await i18n.changeLanguage("fr");
    render(
      <I18nextProvider i18n={i18n}>
        <div data-testid="i18n-check">{i18n.t("dashboard.title")}</div>
      </I18nextProvider>
    );
    expect(screen.getByTestId("i18n-check").textContent).toBe("Tableau de bord");
  });

  it("returns the key itself for missing translation keys", () => {
    expect(i18n.t("nonexistent.key")).toBe("nonexistent.key");
  });
});
