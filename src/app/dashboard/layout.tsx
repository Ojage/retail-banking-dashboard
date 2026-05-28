import { PremiumTopNav } from "@/components/premium/navigation/PremiumTopNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PremiumTopNav />
      {children}
    </>
  );
}
