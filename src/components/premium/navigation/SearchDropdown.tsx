"use client";

import { useEffect, useMemo, useRef } from "react";

import Link from "next/link";

import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useGetAccountsQuery, useGetTransactionsQuery } from "@/store/api/bankingApi";
import {
  setSearchQuery,
  setSearchResults,
  setSearchOpen,
  clearSearch,
} from "@/store/slices/searchSlice";
import type { SearchResult } from "@/types";

import styles from "./SearchDropdown.module.scss";

export function SearchDropdown() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { query, results, isOpen } = useTypedSelector((s) => s.search);
  const { data: accounts } = useGetAccountsQuery();
  const { data: transactions } = useGetTransactionsQuery(accounts?.[0]?.id ?? "", {
    skip: !accounts?.[0]?.id,
  });
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        dispatch(setSearchOpen(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const q = query.toLowerCase().trim();
    const res: SearchResult[] = [];

    if (accounts) {
      accounts.forEach((acc) => {
        if (
          acc.name.toLowerCase().includes(q) ||
          acc.accountNumber.includes(q) ||
          acc.maskedNumber.includes(q)
        ) {
          res.push({
            id: `search-acc-${acc.id}`,
            type: "account",
            label: acc.name,
            description: `${acc.maskedNumber} · ${acc.type} · ${acc.balance.toLocaleString("en-US", { style: "currency", currency: acc.currency })}`,
            href: "/dashboard/accounts",
          });
        }
      });
    }

    if (transactions) {
      transactions.forEach((txn) => {
        if (
          txn.description.toLowerCase().includes(q) ||
          txn.merchant.toLowerCase().includes(q) ||
          txn.category.toLowerCase().includes(q) ||
          txn.reference.toLowerCase().includes(q)
        ) {
          res.push({
            id: `search-txn-${txn.id}`,
            type: "transaction",
            label: txn.description,
            description: `${txn.merchant} · ${txn.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })} · ${new Date(txn.date).toLocaleDateString()}`,
            href: "/dashboard/transactions",
          });
        }
      });
    }

    return res.slice(0, 10);
  }, [query, accounts, transactions]);

  const handleChange = (value: string) => {
    dispatch(setSearchQuery(value));
    if (value.trim()) {
      dispatch(setSearchResults(searchResults));
      dispatch(setSearchOpen(true));
    } else {
      dispatch(setSearchOpen(false));
    }
  };

  useEffect(() => {
    if (query.trim() && searchResults.length > 0) {
      dispatch(setSearchResults(searchResults));
      dispatch(setSearchOpen(true));
    }
  }, [searchResults, query, dispatch]);

  const handleSelect = () => {
    dispatch(clearSearch());
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.inputWrapper}>
        <svg
          className={styles.searchIcon}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          placeholder={t("nav.search")}
          aria-label={t("nav.searchAria")}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => query.trim() && dispatch(setSearchOpen(true))}
        />
        {query && (
          <button
            className={styles.clearBtn}
            onClick={() => dispatch(clearSearch())}
            aria-label="Clear search"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.href}
              className={styles.resultItem}
              onClick={handleSelect}
            >
              <div className={styles.resultIcon}>
                {result.type === "account" ? (
                  <svg
                    width="14"
                    height="14"
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
                ) : (
                  <svg
                    width="14"
                    height="14"
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
                )}
              </div>
              <div className={styles.resultContent}>
                <div className={styles.resultLabel}>{result.label}</div>
                <div className={styles.resultDesc}>{result.description}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className={styles.dropdown}>
          <div className={styles.empty}>No results found</div>
        </div>
      )}
    </div>
  );
}
