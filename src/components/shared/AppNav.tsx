"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";

import styles from "./AppNav.module.scss";

export function AppNav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS = [
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/dashboard/transactions", label: t("nav.transactions") },
    { href: "/dashboard/transfer", label: t("nav.transfer") },
  ];

  const handleLogout = useCallback(async () => {
    setMenuOpen(false);
    await logout();
  }, [logout]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.nav} aria-label={t("nav.mainNavigation")}>
      <div className={styles.inner}>
        <Link href="/dashboard" className={styles.brand}>
          <div className={styles.brandIcon}>R</div>
          <span className={styles.brandText}>RetBankX</span>
        </Link>

        <div className={styles.links}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className={styles.actions}>
          <LanguageSwitcher />

          {!loading && user && (
            <div className={styles.userMenu} ref={menuRef}>
              <button
                className={styles.userButton}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? t("nav.closeUserMenu") : t("nav.showUserMenu")}
              >
                <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
                <span className={styles.userName}>{user.name}</span>
              </button>

              {menuOpen && (
                <div className={styles.dropdown} role="menu" aria-label={t("nav.userMenuLabel")}>
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownName}>{user.name}</div>
                    <div className={styles.dropdownEmail}>{user.email}</div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} onClick={handleLogout} role="menuitem">
                    {t("nav.signOut")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
