"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";

import { useTranslation } from "react-i18next";

import { useAuth } from "@/hooks/useAuth";

import { NotificationBell } from "./NotificationBell";
import styles from "./PremiumTopNav.module.scss";
import { SearchDropdown } from "./SearchDropdown";

export function PremiumTopNav() {
  const { t } = useTranslation();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <header className={styles.topnav}>
      <div className={styles.inner}>
        <Link href="/dashboard" className={styles.brand}>
          <span className={styles.brandText}>RetBankX</span>
        </Link>

        <SearchDropdown />

        <div className={styles.actions}>
          <NotificationBell />

          {!loading && user && (
            <div className={styles.userMenu} ref={menuRef}>
              <button
                className={styles.userButton}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userRole}>{t("nav.accountHolder")}</span>
                </div>
                <svg
                  className={`${styles.chevron} ${menuOpen ? styles.chevronOpen : ""}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {menuOpen && (
                <div className={styles.dropdown} role="menu">
                  <div className={styles.dropdownHeader}>
                    <div className={styles.dropdownAvatar}>{user.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className={styles.dropdownName}>{user.name}</div>
                      <div className={styles.dropdownEmail}>{user.email}</div>
                    </div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} role="menuitem">
                    {t("nav.profileSettings")}
                  </button>
                  <button className={styles.dropdownItem} role="menuitem">
                    {t("nav.accountPreferences")}
                  </button>
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
    </header>
  );
}
