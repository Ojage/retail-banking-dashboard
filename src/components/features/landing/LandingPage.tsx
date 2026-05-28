"use client";

import Link from "next/link";

import { useTranslation } from "react-i18next";

import styles from "./LandingPage.module.scss";

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>{t("landing.badge")}</span>
          </div>
          <h1 className={styles.heroTitle}>{t("landing.hero.title")}</h1>
          <p className={styles.heroSubtitle}>{t("landing.hero.subtitle")}</p>
          <div className={styles.heroActions}>
            <Link href="/auth/signup" className={styles.primaryButton}>
              {t("landing.hero.cta")}
            </Link>
            <Link href="/auth/login" className={styles.secondaryButton}>
              {t("landing.hero.signin")}
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{t("landing.stats.assets.value")}</div>
          <div className={styles.statLabel}>{t("landing.stats.assets.label")}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{t("landing.stats.uptime.value")}</div>
          <div className={styles.statLabel}>{t("landing.stats.uptime.label")}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{t("landing.stats.users.value")}</div>
          <div className={styles.statLabel}>{t("landing.stats.users.label")}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{t("landing.stats.rating.value")}</div>
          <div className={styles.statLabel}>{t("landing.stats.rating.label")}</div>
        </div>
      </div>

      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <div className={styles.featuresEyebrow}>{t("landing.features.eyebrow")}</div>
          <h2 className={styles.featuresTitle}>{t("landing.features.title")}</h2>
          <p className={styles.featuresSubtitle}>{t("landing.features.subtitle")}</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className={styles.featureName}>{t("landing.features.items.realtime.name")}</h3>
            <p className={styles.featureDesc}>{t("landing.features.items.realtime.desc")}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 className={styles.featureName}>{t("landing.features.items.insights.name")}</h3>
            <p className={styles.featureDesc}>{t("landing.features.items.insights.desc")}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </div>
            <h3 className={styles.featureName}>{t("landing.features.items.transfers.name")}</h3>
            <p className={styles.featureDesc}>{t("landing.features.items.transfers.desc")}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className={styles.featureName}>{t("landing.features.items.security.name")}</h3>
            <p className={styles.featureDesc}>{t("landing.features.items.security.desc")}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className={styles.featureName}>{t("landing.features.items.global.name")}</h3>
            <p className={styles.featureDesc}>{t("landing.features.items.global.desc")}</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066CC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className={styles.featureName}>{t("landing.features.items.audit.name")}</h3>
            <p className={styles.featureDesc}>{t("landing.features.items.audit.desc")}</p>
          </div>
        </div>
      </section>

      <section className={styles.security}>
        <h2 className={styles.securityTitle}>{t("landing.security.title")}</h2>
        <p className={styles.securitySubtitle}>{t("landing.security.subtitle")}</p>
        <div className={styles.securityGrid}>
          <div className={styles.securityItem}>
            <div className={styles.securityItemIcon}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className={styles.securityItemLabel}>
              {t("landing.security.items.encryption.label")}
            </div>
            <div className={styles.securityItemDesc}>
              {t("landing.security.items.encryption.desc")}
            </div>
          </div>
          <div className={styles.securityItem}>
            <div className={styles.securityItemIcon}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className={styles.securityItemLabel}>{t("landing.security.items.soc2.label")}</div>
            <div className={styles.securityItemDesc}>{t("landing.security.items.soc2.desc")}</div>
          </div>
          <div className={styles.securityItem}>
            <div className={styles.securityItemIcon}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div className={styles.securityItemLabel}>
              {t("landing.security.items.monitoring.label")}
            </div>
            <div className={styles.securityItemDesc}>
              {t("landing.security.items.monitoring.desc")}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>{t("landing.cta.title")}</h2>
        <p className={styles.ctaSubtitle}>{t("landing.cta.subtitle")}</p>
        <Link href="/auth/signup" className={styles.primaryButton}>
          {t("landing.cta.button")}
        </Link>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href="/" className={styles.footerLogo}>
            <div className={styles.footerLogoIcon}>R</div>
            {t("landing.footer.brand")}
          </Link>
          <div className={styles.footerLinks}>
            <Link href="/auth/login" className={styles.footerLink}>
              {t("landing.hero.signin")}
            </Link>
            <span className={styles.footerLink} role="link" tabIndex={0}>
              {t("landing.footer.privacy")}
            </span>
            <span className={styles.footerLink} role="link" tabIndex={0}>
              {t("landing.footer.terms")}
            </span>
            <span className={styles.footerLink} role="link" tabIndex={0}>
              {t("landing.footer.contact")}
            </span>
          </div>
        </div>
        <div className={styles.footerLegal}>
          {t("landing.footer.legal", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </>
  );
}
