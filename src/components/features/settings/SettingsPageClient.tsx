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
  const { user } = useAuth();

  return (
    <Container header={<Header variant="h2">Profile Information</Header>}>
      <div className={styles.profileGrid}>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Full Name</div>
          <div className={styles.fieldValue}>{user?.name ?? "—"}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Email Address</div>
          <div className={styles.fieldValue}>{user?.email ?? "—"}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Member Since</div>
          <div className={styles.fieldValue}>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Account Status</div>
          <div className={styles.fieldValue}>
            <Badge color="green">Verified</Badge>
          </div>
        </div>
      </div>
    </Container>
  );
}

function PreferencesSection() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLocale = useTypedSelector((s) => s.ui.locale);

  const handleLocaleChange = (value: string) => {
    const locale = value as "en" | "fr";
    dispatch(setLocale(locale));
    void i18n.changeLanguage(locale);
  };

  return (
    <Container header={<Header variant="h2">Preferences</Header>}>
      <div className={styles.prefsList}>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>Language</div>
            <div className={styles.prefDesc}>Choose your preferred language for the interface</div>
          </div>
          <div className={styles.prefControl}>
            <Select
              selectedOption={{
                value: currentLocale,
                label: currentLocale === "en" ? "English" : "Français",
              }}
              onChange={({ detail }) => handleLocaleChange(detail.selectedOption.value!)}
              options={[
                { value: "en", label: "English" },
                { value: "fr", label: "Français" },
              ]}
            />
          </div>
        </div>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>Currency Display</div>
            <div className={styles.prefDesc}>All monetary values are displayed in USD</div>
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
  return (
    <Container header={<Header variant="h2">Security</Header>}>
      <div className={styles.prefsList}>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>Password</div>
            <div className={styles.prefDesc}>Last changed 3 months ago</div>
          </div>
          <div className={styles.prefControl}>
            <Button variant="normal">Change Password</Button>
          </div>
        </div>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>Two-Factor Authentication</div>
            <div className={styles.prefDesc}>Add an extra layer of security to your account</div>
          </div>
          <div className={styles.prefControl}>
            <Button variant="primary">Enable 2FA</Button>
          </div>
        </div>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>Active Sessions</div>
            <div className={styles.prefDesc}>You are logged in on this device</div>
          </div>
          <div className={styles.prefControl}>
            <Badge color="green">1 Active Session</Badge>
          </div>
        </div>
      </div>
    </Container>
  );
}

function DangerSection() {
  return (
    <Container
      header={
        <Header variant="h2">
          <span className={styles.dangerHeader}>Danger Zone</span>
        </Header>
      }
    >
      <div className={styles.prefsList}>
        <div className={styles.prefItem}>
          <div>
            <div className={styles.prefLabel}>Close Account</div>
            <div className={styles.prefDesc}>
              Permanently close your account and remove all associated data. This action cannot be
              undone.
            </div>
          </div>
          <div className={styles.prefControl}>
            <Button variant="normal">
              <span className={styles.dangerText}>Close Account</span>
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
