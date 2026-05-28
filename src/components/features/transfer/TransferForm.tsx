"use client";

import { useState } from "react";

import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@/components/ui/Button";
import Flashbar from "@/components/ui/Flashbar";
import type { FlashbarProps } from "@/components/ui/Flashbar";
import Form from "@/components/ui/Form";
import FormField from "@/components/ui/FormField";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import SpaceBetween from "@/components/ui/SpaceBetween";
import Spinner from "@/components/ui/Spinner";
import { useAccounts } from "@/hooks/useAccounts";
import { useTransfer } from "@/hooks/useTransfer";

import styles from "./TransferForm.module.scss";

export function TransferForm() {
  const { t } = useTranslation();
  const { accounts } = useAccounts();
  const { control, submit, errors, status, serverError, reset } = useTransfer(accounts);
  const [dismissed, setDismissed] = useState(false);

  const accountOptions = accounts.map((a) => ({
    value: a.id,
    label: `${a.name} (${a.maskedNumber})`,
    description: t("transfer.form.balanceLabel", {
      balance: a.balance.toLocaleString("en-US", { style: "currency", currency: a.currency }),
    }),
  }));

  const flashItems: FlashbarProps.MessageDefinition[] = [];

  if (status === "success" && !dismissed) {
    flashItems.push({
      id: "transfer-success",
      type: "success",
      header: t("transfer.form.success.header"),
      content: t("transfer.form.success.text"),
      dismissible: true,
      onDismiss: () => {
        setDismissed(true);
        reset();
      },
    });
  }

  if ((status === "error" || serverError) && !dismissed) {
    flashItems.push({
      id: "transfer-error",
      type: "error",
      header: t("transfer.form.error.header"),
      content: serverError ?? t("transfer.form.error.generic"),
      dismissible: true,
      onDismiss: () => {
        setDismissed(true);
      },
    });
  }

  const handleSubmit = () => {
    setDismissed(false);
    void submit();
  };

  return (
    <div className={styles["form-wrapper"]}>
      <SpaceBetween size="m" direction="vertical">
        {flashItems.length > 0 && <Flashbar items={flashItems} />}
        <div role="form" aria-label={t("transfer.form.ariaLabel")}>
          <Form
            header={
              <Header variant="h2" description={t("transfer.description")}>
                {t("transfer.title")}
              </Header>
            }
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={reset} disabled={status === "loading"}>
                  {t("transfer.form.reset")}
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? (
                    <span className={styles["spinner-overlay"]}>
                      <Spinner size="normal" />
                      {t("transfer.form.submitting")}
                    </span>
                  ) : (
                    t("transfer.form.submit")
                  )}
                </Button>
              </SpaceBetween>
            }
          >
            <SpaceBetween size="l" direction="vertical">
              <Controller
                name="fromAccountId"
                control={control}
                render={({ field }) => (
                  <FormField
                    label={t("transfer.form.fromAccount.label")}
                    errorText={errors.fromAccountId?.message}
                  >
                    <Select
                      selectedOption={accountOptions.find((o) => o.value === field.value) ?? null}
                      onChange={({ detail }) => field.onChange(detail.selectedOption.value ?? "")}
                      options={accountOptions}
                      placeholder={t("transfer.form.fromAccount.placeholder")}
                    />
                  </FormField>
                )}
              />

              <Controller
                name="toAccountId"
                control={control}
                render={({ field }) => (
                  <FormField
                    label={t("transfer.form.toAccount.label")}
                    errorText={errors.toAccountId?.message}
                  >
                    <Select
                      selectedOption={accountOptions.find((o) => o.value === field.value) ?? null}
                      onChange={({ detail }) => field.onChange(detail.selectedOption.value ?? "")}
                      options={accountOptions}
                      placeholder={t("transfer.form.toAccount.placeholder")}
                    />
                  </FormField>
                )}
              />

              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <FormField
                    label={t("transfer.form.amount.label")}
                    errorText={errors.amount?.message}
                    constraintText={t("transfer.form.amount.constraint")}
                  >
                    <Input
                      type="number"
                      value={field.value === 0 ? "" : String(field.value)}
                      onChange={({ detail }) => {
                        const parsed = parseFloat(detail.value);
                        field.onChange(isNaN(parsed) ? 0 : parsed);
                      }}
                      placeholder={t("transfer.form.amount.placeholder")}
                      inputMode="decimal"
                    />
                  </FormField>
                )}
              />
            </SpaceBetween>
          </Form>
        </div>
      </SpaceBetween>
    </div>
  );
}
