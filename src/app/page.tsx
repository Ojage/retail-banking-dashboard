import type { Metadata } from "next";

import { LandingPage } from "@/components/features/landing/LandingPage";

export const metadata: Metadata = {
  title: "RetBankX — Modern Banking",
  description:
    "RetBankX gives you real-time insights, instant transfers, and enterprise-grade security in one intuitive dashboard.",
};

export default function HomePage() {
  return <LandingPage />;
}
