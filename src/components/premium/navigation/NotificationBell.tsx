"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import {
  markAllAsRead,
  dismissNotification,
  clearAllNotifications,
} from "@/store/slices/notificationsSlice";
import type { AppNotification } from "@/types";

import styles from "./NotificationBell.module.scss";

function NotificationItem({ notif }: { notif: AppNotification }) {
  const dispatch = useAppDispatch();
  const icon = {
    success: (
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    info: (
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    warning: (
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
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    error: (
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
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  };

  const timeAgo = (ts: string) => {
    const seconds = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
    if (seconds < 60) {
      return "just now";
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className={`${styles.notifItem} ${!notif.read ? styles.unread : ""}`}>
      <div className={`${styles.notifIcon} ${styles[notif.type]}`}>{icon[notif.type]}</div>
      <div className={styles.notifContent}>
        <div className={styles.notifTitle}>{notif.title}</div>
        <div className={styles.notifMessage}>{notif.message}</div>
        <div className={styles.notifTime}>{timeAgo(notif.timestamp)}</div>
      </div>
      <button
        className={styles.notifDismiss}
        onClick={() => dispatch(dismissNotification(notif.id))}
        aria-label="Dismiss"
      >
        <svg
          width="12"
          height="12"
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
    </div>
  );
}

export function NotificationBell() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const notifications = useTypedSelector((s) => s.notifications.notifications);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.bellBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("nav.notifications")}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
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
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownTitle}>Notifications</span>
            {notifications.length > 0 && (
              <div className={styles.dropdownActions}>
                <button className={styles.dropdownAction} onClick={() => dispatch(markAllAsRead())}>
                  Mark all read
                </button>
                <button
                  className={styles.dropdownAction}
                  onClick={() => dispatch(clearAllNotifications())}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          <div className={styles.notifList}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>No notifications</div>
            ) : (
              notifications.map((notif) => <NotificationItem key={notif.id} notif={notif} />)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
