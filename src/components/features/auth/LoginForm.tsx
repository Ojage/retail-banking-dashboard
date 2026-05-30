"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTranslation } from "react-i18next";

import { PasswordInput } from "@/components/shared/PasswordInput";
import { useAuth } from "@/hooks/useAuth";

import styles from "./AuthForm.module.scss";

export function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(t("auth.login.errors.missingEmail"));
      return;
    }
    if (!password) {
      setError(t("auth.login.errors.missingPassword"));
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error ?? t("auth.login.errors.failed"));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <Image
            src="/images/retailBankx_logo.png"
            alt=""
            width={28}
            height={28}
            className={styles.logoIcon}
          />
          <span className={styles.logoText}>{t("auth.logo")}</span>
        </div>

        <h1 className={styles.title}>{t("auth.login.title")}</h1>
        <p className={styles.subtitle}>{t("auth.login.subtitle")}</p>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <div className={styles.demoWarning}>{t("auth.login.demoWarning")}</div>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              {t("auth.login.email.label")}
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.login.email.placeholder")}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              {t("auth.login.password.label")}
            </label>
            <PasswordInput
              id="password"
              value={password}
              onChange={setPassword}
              placeholder={t("auth.login.password.placeholder")}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? t("auth.login.submitting") : t("auth.login.submit")}
          </button>
        </form>

        <div className={styles.link}>
          {t("auth.login.noAccount")} <Link href="/auth/signup">{t("auth.login.createLink")}</Link>
        </div>
      </div>
    </div>
  );
}
