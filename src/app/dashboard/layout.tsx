import { PremiumTopNav } from "@/components/premium/navigation/PremiumTopNav";
import { AuthGuard } from "@/components/shared/AuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <PremiumTopNav />
      {children}
    </AuthGuard>
  );
}
