"use client";

import { useTranslation } from "react-i18next";

import { PremiumSideNav } from "@/components/premium/navigation/PremiumSideNav";
import AppLayout from "@/components/ui/AppLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";
import Select from "@/components/ui/Select";
import SpaceBetween from "@/components/ui/SpaceBetween";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAuth } from "@/hooks/useAuth";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { setLocale } from "@/store/slices/uiSlice";

import styles from "./SettingsPage.module.scss";

function ProfileSection() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  return (
    <Container header={<Header variant="h2">{t("settings.profileInformation")}</Header>}>
      <div className={styles.profileGrid}>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>{t("settings.fullName")}</div>
          <div className={styles.fieldValue}>{user?.name ?? "—"}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>{t("settings.emailAddress")}</div>
          <div className={styles.fieldValue}>{user?.email ?? "—"}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>{t("settings.memberSince")}</div>
          <div className={styles.fieldValue}>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString(i18n.language, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>{t("settings.accountStatus")}</div>
          <div className={styles.fieldValue}>
            <Badge color="green">{t("settings.verified")}</Badge>
          </div>
        </div>
      </div>
    </Container>
  );
}

function PreferencesSection() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLocale = useTypedSelector((s) => s.ui.locale);

  const handleLocaleChange = (value: string) => {
    const locale = value as "en" | "fr";
    dispatch(setLocale(locale));
    void i18n.changeLanguage(locale);
  };

  return (
    <Container header={<Header variant="h2">{t("settings.preferences")}</Header>}>
      <div className={styles.prefsList}>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>{t("settings.language")}</div>
            <div className={styles.prefDesc}>{t("settings.languageDesc")}</div>
          </div>
          <div className={styles.prefControl}>
            <Select
              selectedOption={{
                value: currentLocale,
                label: currentLocale === "en" ? t("language.en") : t("language.fr"),
              }}
              onChange={({ detail }) => handleLocaleChange(detail.selectedOption.value!)}
              options={[
                { value: "en", label: t("language.en") },
                { value: "fr", label: t("language.fr") },
              ]}
            />
          </div>
        </div>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>{t("settings.currencyDisplay")}</div>
            <div className={styles.prefDesc}>{t("settings.currencyDesc")}</div>
          </div>
          <div className={styles.prefControl}>
            <Badge color="blue">USD</Badge>
          </div>
        </div>
      </div>
    </Container>
  );
}

function SecuritySection() {
  const { t } = useTranslation();
  return (
    <Container header={<Header variant="h2">{t("settings.security")}</Header>}>
      <div className={styles.prefsList}>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>{t("settings.password")}</div>
            <div className={styles.prefDesc}>{t("settings.passwordDesc")}</div>
          </div>
          <div className={styles.prefControl}>
            <Button variant="normal">{t("settings.changePassword")}</Button>
          </div>
        </div>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>{t("settings.twoFactor")}</div>
            <div className={styles.prefDesc}>{t("settings.twoFactorDesc")}</div>
          </div>
          <div className={styles.prefControl}>
            <Button variant="primary">{t("settings.enable2FA")}</Button>
          </div>
        </div>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>{t("settings.activeSessions")}</div>
            <div className={styles.prefDesc}>{t("settings.sessionsDesc")}</div>
          </div>
          <div className={styles.prefControl}>
            <Badge color="green">{t("settings.activeSessionCount")}</Badge>
          </div>
        </div>
      </div>
    </Container>
  );
}

function DangerSection() {
  const { t } = useTranslation();
  return (
    <Container
      header={
        <Header variant="h2">
          <span className={styles.dangerHeader}>{t("settings.dangerZone")}</span>
        </Header>
      }
    >
      <div className={styles.prefsList}>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>{t("settings.closeAccount")}</div>
            <div className={styles.prefDesc}>{t("settings.closeAccountDesc")}</div>
          </div>
          <div className={styles.prefControl}>
            <Button variant="normal">
              <span className={styles.dangerText}>{t("settings.closeAccount")}</span>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export function SettingsPageClient() {
  const { t } = useTranslation();

  return (
    <AppLayout
      navigation={<PremiumSideNav />}
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" description={t("settings.description")}>
              {t("settings.title")}
            </Header>
          }
        >
          <SpaceBetween size="l" direction="vertical">
            <ProfileSection />
            <PreferencesSection />
            <SecuritySection />
            <DangerSection />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
