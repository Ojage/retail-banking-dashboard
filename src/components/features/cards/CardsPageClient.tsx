"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { PremiumSideNav } from "@/components/premium/navigation/PremiumSideNav";
import AppLayout from "@/components/ui/AppLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";
import StatusIndicator from "@/components/ui/StatusIndicator";
import Table from "@/components/ui/Table";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";

import styles from "./CardsPage.module.scss";

const CARDS = [
  {
    id: "card-001",
    type: "Debit",
    network: "Visa",
    name: "Checking Debit Card",
    cardholder: "John Smith",
    maskedNumber: "**** 4821",
    expiry: "08/28",
    status: "active",
    freeze: false,
    color: "#1e3a5f",
    gradient: "premium-gradient-blue",
    spendingLimit: 2500,
    usedAmount: 874.5,
    cashWithdrawn: 0,
    foreignTx: false,
    contactless: true,
  },
  {
    id: "card-002",
    type: "Credit",
    network: "Mastercard",
    name: "Premium Rewards Card",
    cardholder: "John Smith",
    maskedNumber: "**** 6631",
    expiry: "11/27",
    status: "active",
    freeze: false,
    color: "#2e1065",
    gradient: "premium-gradient-purple",
    spendingLimit: 15000,
    usedAmount: 3240.8,
    cashWithdrawn: 500,
    foreignTx: true,
    contactless: true,
  },
  {
    id: "card-003",
    type: "Credit",
    network: "Visa",
    name: "Business Platinum Card",
    cardholder: "John Smith",
    maskedNumber: "**** 9902",
    expiry: "03/29",
    status: "dormant",
    freeze: true,
    color: "#78350f",
    gradient: "premium-gradient-amber",
    spendingLimit: 50000,
    usedAmount: 0,
    cashWithdrawn: 0,
    foreignTx: false,
    contactless: false,
  },
];

const RECENT_CARD_TXNS = [
  {
    id: "ctxn-001",
    date: "2026-05-27",
    merchant: "Amazon.com",
    amount: 89.99,
    type: "Debit",
    status: "completed",
  },
  {
    id: "ctxn-002",
    date: "2026-05-26",
    merchant: "Uber Ride",
    amount: 32.5,
    type: "Debit",
    status: "completed",
  },
  {
    id: "ctxn-003",
    date: "2026-05-25",
    merchant: "Netflix",
    amount: 14.99,
    type: "Debit",
    status: "completed",
  },
  {
    id: "ctxn-004",
    date: "2026-05-24",
    merchant: "Whole Foods",
    amount: 124.5,
    type: "Debit",
    status: "completed",
  },
  {
    id: "ctxn-005",
    date: "2026-05-23",
    merchant: "Shell Gas",
    amount: 58.4,
    type: "Debit",
    status: "pending",
  },
];

function CardFront({ card }: { card: (typeof CARDS)[0] }) {
  const { format } = useCurrencyFormatter();
  const limitRemaining = card.spendingLimit - card.usedAmount;
  const usedPct = (card.usedAmount / card.spendingLimit) * 100;

  const [frozen, setFrozen] = useState(card.freeze);

  return (
    <motion.div
      className={`${styles.card} ${card.gradient}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardType}>
          {card.network} {card.type}
        </div>
        <div className={styles.cardStatus}>
          {frozen ? <Badge color="grey">Frozen</Badge> : <Badge color="green">Active</Badge>}
        </div>
      </div>

      <div className={styles.cardChip}>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="23"
            rx="3.5"
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.2)"
          />
          <rect x="4" y="4" width="10" height="7" rx="1" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      <div className={styles.cardNumber}>{card.maskedNumber}</div>

      <div className={styles.cardDetails}>
        <div>
          <div className={styles.cardDetailLabel}>Card Holder</div>
          <div className={styles.cardDetailValue}>{card.cardholder}</div>
        </div>
        <div>
          <div className={styles.cardDetailLabel}>Expires</div>
          <div className={styles.cardDetailValue}>{card.expiry}</div>
        </div>
      </div>

      <div className={styles.cardActions}>
        <Button variant={frozen ? "primary" : "normal"} onClick={() => setFrozen(!frozen)}>
          {frozen ? "Unfreeze Card" : "Freeze Card"}
        </Button>
      </div>

      <div className={styles.cardLimit}>
        <div className={styles.cardLimitTop}>
          <span className={styles.cardLimitLabel}>
            {card.type === "Credit" ? "Credit Limit" : "Daily Limit"}
          </span>
          <span className={styles.cardLimitUsed}>
            {format(card.usedAmount, "USD")} / {format(card.spendingLimit, "USD")}
          </span>
        </div>
        <div className={styles.cardLimitBar}>
          <div className={styles.cardLimitFill} style={{ width: `${Math.min(usedPct, 100)}%` }} />
        </div>
        <div className={styles.cardLimitRemaining}>{format(limitRemaining, "USD")} remaining</div>
      </div>
    </motion.div>
  );
}

export function CardsPageClient() {
  const { t } = useTranslation();
  const { format } = useCurrencyFormatter();

  const amountCell = (item: (typeof RECENT_CARD_TXNS)[0]) => (
    <span className={item.type === "Credit" ? styles.amountCredit : styles.amountDebit}>
      {item.type === "Credit" ? "+" : "-"}
      {format(item.amount, "USD")}
    </span>
  );

  const statusCell = (item: (typeof RECENT_CARD_TXNS)[0]) => (
    <StatusIndicator
      type={
        item.status === "completed" ? "success" : item.status === "pending" ? "pending" : "error"
      }
    >
      {item.status}
    </StatusIndicator>
  );

  return (
    <AppLayout
      navigation={<PremiumSideNav />}
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" description={t("cards.description")}>
              {t("cards.title")}
            </Header>
          }
        >
          <div className={styles.cardGrid}>
            {CARDS.map((card) => (
              <CardFront key={card.id} card={card} />
            ))}
          </div>

          <div className={styles.txnSection}>
            <Table
              variant="container"
              trackBy="id"
              items={RECENT_CARD_TXNS}
              columnDefinitions={[
                { id: "date", header: "Date", cell: (item) => item.date, isRowHeader: true },
                { id: "merchant", header: "Merchant", cell: (item) => item.merchant },
                { id: "amount", header: "Amount", cell: amountCell },
                { id: "status", header: "Status", cell: statusCell },
              ]}
              header={
                <Header variant="h2" counter={`(${RECENT_CARD_TXNS.length})`}>
                  Recent Card Transactions
                </Header>
              }
            />
          </div>
        </ContentLayout>
      }
    />
  );
}
