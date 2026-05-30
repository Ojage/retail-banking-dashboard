"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslation } from "react-i18next";

import styles from "./PremiumSideNav.module.scss";

const ICONS: Record<string, React.ReactNode> = {
  grid: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  bank: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 22 7 12 2" />
      <line x1="2" y1="7" x2="2" y2="12" />
      <line x1="22" y1="7" x2="22" y2="12" />
      <line x1="6" y1="12" x2="6" y2="17" />
      <line x1="10" y1="12" x2="10" y2="17" />
      <line x1="14" y1="12" x2="14" y2="17" />
      <line x1="18" y1="12" x2="18" y2="17" />
      <path d="M4 21h16" />
    </svg>
  ),
  arrows: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  send: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  chart: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  trending: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  credit: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  settings: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
};

export function PremiumSideNav() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const SECTIONS = [
    {
      label: t("nav.sections.main"),
      items: [
        { href: "/dashboard", label: t("nav.dashboard"), icon: "grid" },
        { href: "/dashboard/accounts", label: t("nav.accounts"), icon: "bank" },
        { href: "/dashboard/transactions", label: t("nav.transactions"), icon: "arrows" },
      ],
    },
    {
      label: t("nav.sections.banking"),
      items: [
        { href: "/dashboard/transfer", label: t("nav.transfer"), icon: "send" },
        { href: "/dashboard/analytics", label: t("nav.analytics"), icon: "chart" },
        { href: "/dashboard/investments", label: t("nav.investments"), icon: "trending" },
      ],
    },
    {
      label: t("nav.sections.services"),
      items: [
        { href: "/dashboard/cards", label: t("nav.cards"), icon: "credit" },
        { href: "/dashboard/settings", label: t("nav.settings"), icon: "settings" },
      ],
    },
  ];

  return (
    <aside className={styles.sidenav}>
      <div className={styles.sections}>
        {SECTIONS.map((section) => (
          <div key={section.label} className={styles.section}>
            <div className={styles.sectionLabel}>{section.label}</div>
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                >
                  <span className={`${styles.navIcon} ${isActive ? styles.navIconActive : ""}`}>
                    {ICONS[item.icon]}
                  </span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {isActive && <span className={styles.activeIndicator} />}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerCard}>
          <div className={styles.footerIcon}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className={styles.footerText}>
            <div className={styles.footerTitle}>{t("nav.fdicInsured")}</div>
            <div className={styles.footerSub}>{t("nav.fdicCoverage")}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
