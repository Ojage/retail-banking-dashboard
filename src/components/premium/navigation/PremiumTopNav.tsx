"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";

import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

import styles from "./PremiumTopNav.module.scss";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/transactions", label: "Transactions" },
  { href: "/dashboard/transfer", label: "Transfers" },
];

export function PremiumTopNav() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
          <div className={styles.brandIcon}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <span className={styles.brandText}>RetBankX</span>
          <span className={styles.brandBadge}>Enterprise</span>
        </Link>

        <nav className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.search}>
          <Input
            type="search"
            placeholder="Search accounts, transactions..."
            ariaLabel="Search"
            value={searchValue}
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.notificationBtn} aria-label="Notifications">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className={styles.notificationDot} />
          </button>

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
                  <span className={styles.userRole}>Account Holder</span>
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
                    Profile Settings
                  </button>
                  <button className={styles.dropdownItem} role="menuitem">
                    Account Preferences
                  </button>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem} onClick={handleLogout} role="menuitem">
                    Sign Out
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
