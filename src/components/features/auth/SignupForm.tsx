"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useTranslation } from "react-i18next";

import { PasswordInput } from "@/components/shared/PasswordInput";
import { useAuth } from "@/hooks/useAuth";

import styles from "./AuthForm.module.scss";

export function SignupForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError(t("auth.signup.errors.missingName"));
      return;
    }
    if (!email.trim()) {
      setError(t("auth.signup.errors.missingEmail"));
      return;
    }
    if (password.length < 8) {
      setError(t("auth.signup.errors.passwordTooShort"));
      return;
    }

    setSubmitting(true);
    const result = await signup(name, email, password);
    setSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error ?? t("auth.signup.errors.failed"));
    }
  };

  const passwordStrength =
    password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>R</div>
          <span className={styles.logoText}>{t("auth.logo")}</span>
        </div>

        <h1 className={styles.title}>{t("auth.signup.title")}</h1>
        <p className={styles.subtitle}>{t("auth.signup.subtitle")}</p>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              {t("auth.signup.name.label")}
            </label>
            <input
              id="name"
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("auth.signup.name.placeholder")}
              autoComplete="name"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              {t("auth.signup.email.label")}
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.signup.email.placeholder")}
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              {t("auth.signup.password.label")}
            </label>
            <PasswordInput
              id="password"
              value={password}
              onChange={setPassword}
              placeholder={t("auth.signup.password.placeholder")}
              autoComplete="new-password"
            />
            {password.length > 0 && (
              <div
                style={{
                  marginTop: 6,
                  height: 3,
                  borderRadius: 2,
                  background: "#E9EBED",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(passwordStrength / 3) * 100}%`,
                    borderRadius: 2,
                    background:
                      passwordStrength === 1
                        ? "#D13212"
                        : passwordStrength === 2
                          ? "#FFB800"
                          : "#00A36C",
                    transition: "width 0.2s, background 0.2s",
                  }}
                />
              </div>
            )}
          </div>

          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? t("auth.signup.submitting") : t("auth.signup.submit")}
          </button>
        </form>

        <div className={styles.link}>
          {t("auth.signup.hasAccount")}{" "}
          <Link href="/auth/login">{t("auth.signup.signinLink")}</Link>
        </div>
      </div>
    </div>
  );
}
