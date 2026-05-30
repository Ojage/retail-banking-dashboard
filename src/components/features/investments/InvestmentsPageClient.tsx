"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PremiumSideNav } from "@/components/premium/navigation/PremiumSideNav";
import AppLayout from "@/components/ui/AppLayout";
import ContentLayout from "@/components/ui/ContentLayout";
import Header from "@/components/ui/Header";
import Table from "@/components/ui/Table";
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";

import styles from "./InvestmentsPage.module.scss";

const PORTFOLIO_SUMMARY = {
  totalValue: 95000,
  totalInvested: 82300,
  totalReturn: 12700,
  returnPercentage: 15.43,
  riskScore: "Moderate",
  diversification: 7,
};

const HOLDINGS = [
  {
    id: "hld-001",
    name: "VTI — Vanguard Total Stock Market ETF",
    shares: 85,
    avgPrice: 235.5,
    currentPrice: 258.2,
    sector: "Broad Market",
    allocation: 23.1,
  },
  {
    id: "hld-002",
    name: "AAPL — Apple Inc.",
    shares: 120,
    avgPrice: 172.3,
    currentPrice: 189.5,
    sector: "Technology",
    allocation: 14.9,
  },
  {
    id: "hld-003",
    name: "MSFT — Microsoft Corp",
    shares: 45,
    avgPrice: 378.4,
    currentPrice: 415.8,
    sector: "Technology",
    allocation: 12.3,
  },
  {
    id: "hld-004",
    name: "VTI — Vanguard Total Bond Market ETF",
    shares: 200,
    avgPrice: 72.8,
    currentPrice: 74.2,
    sector: "Fixed Income",
    allocation: 15.6,
  },
  {
    id: "hld-005",
    name: "JPM — JPMorgan Chase & Co.",
    shares: 60,
    avgPrice: 152.6,
    currentPrice: 178.3,
    sector: "Financials",
    allocation: 11.3,
  },
  {
    id: "hld-006",
    name: "KO — The Coca-Cola Co",
    shares: 150,
    avgPrice: 58.2,
    currentPrice: 62.4,
    sector: "Consumer Staples",
    allocation: 9.9,
  },
  {
    id: "hld-007",
    name: "VWO — Vanguard FTSE Emerging Markets ETF",
    shares: 130,
    avgPrice: 42.5,
    currentPrice: 44.8,
    sector: "Emerging Markets",
    allocation: 7.9,
  },
  {
    id: "hld-008",
    name: "BND — Vanguard Total Bond Market ETF",
    shares: 100,
    avgPrice: 71.2,
    currentPrice: 73.5,
    sector: "Fixed Income",
    allocation: 5.0,
  },
];

const PERFORMANCE_DATA = [
  { month: "Dec", value: 88000 },
  { month: "Jan", value: 89100 },
  { month: "Feb", value: 90500 },
  { month: "Mar", value: 91800 },
  { month: "Apr", value: 93000 },
  { month: "May", value: 95000 },
];

const SECTOR_ALLOCATION = [
  { name: "Broad Market", value: 23.1, color: "#6366f1" },
  { name: "Technology", value: 27.2, color: "#8b5cf6" },
  { name: "Fixed Income", value: 20.6, color: "#a78bfa" },
  { name: "Financials", value: 11.3, color: "#c4b5fd" },
  { name: "Consumer Staples", value: 9.9, color: "#ddd6fe" },
  { name: "Emerging Markets", value: 7.9, color: "#ede9fe" },
];

function PerformanceChart() {
  const { t } = useTranslation();
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>{t("investments.portfolioPerformance")}</span>
        <span className={styles.chartPeriod}>{t("investments.last6Months")}</span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={PERFORMANCE_DATA}>
          <defs>
            <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0969da" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0969da" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e8ecef" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#656d76", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#656d76", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #d0d7de",
              borderRadius: 8,
              fontSize: 12,
              color: "#1F2328",
            }}
            formatter={(value) => [
              `$${(Number(value) || 0).toLocaleString()}`,
              t("investments.portfolioValue"),
            ]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0969da"
            strokeWidth={2}
            fill="url(#perfGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#0969da", stroke: "#ffffff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SectorDonut() {
  const { t } = useTranslation();
  const total = SECTOR_ALLOCATION.reduce((s, d) => s + d.value, 0);

  const donutStyle = {
    background: `conic-gradient(${SECTOR_ALLOCATION.map((s, _j) => {
      let c = 0;
      for (let k = 0; k < _j; k++) {
        c += SECTOR_ALLOCATION[k].value;
      }
      const a = (c / total) * 360;
      const b = ((c + s.value) / total) * 360;
      return `${s.color} ${a}deg ${b}deg`;
    }).join(", ")})`,
  };

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>{t("investments.sectorAllocation")}</span>
        <span className={styles.chartPeriod}>
          {SECTOR_ALLOCATION.length} {t("investments.sectors")}
        </span>
      </div>
      <div className={styles.donutWrapper}>
        <div className={styles.donut} style={donutStyle}>
          <div className={styles.donutCenter}>
            <span className={styles.donutValue}>{total.toFixed(0)}%</span>
            <span className={styles.donutLabel}>{t("investments.allocated")}</span>
          </div>
        </div>
        <div className={styles.donutLegend}>
          {SECTOR_ALLOCATION.map((s) => (
            <div key={s.name} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: s.color }} />
              <span className={styles.legendLabel}>{s.name}</span>
              <span className={styles.legendValue}>{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HoldingsTable() {
  const { t } = useTranslation();
  const { format } = useCurrencyFormatter();

  const marketValue = (item: (typeof HOLDINGS)[0]) => item.shares * item.currentPrice;
  const gainLoss = (item: (typeof HOLDINGS)[0]) =>
    (item.currentPrice - item.avgPrice) * item.shares;
  const gainPercent = (item: (typeof HOLDINGS)[0]) =>
    ((item.currentPrice - item.avgPrice) / item.avgPrice) * 100;

  const amountCell = (item: (typeof HOLDINGS)[0]) => (
    <span className={styles.amount}>{format(marketValue(item), "USD")}</span>
  );

  const gainCell = (item: (typeof HOLDINGS)[0]) => {
    const gl = gainLoss(item);
    const isPositive = gl >= 0;
    return (
      <span className={`${styles.gain} ${isPositive ? styles.gainPositive : styles.gainNegative}`}>
        {isPositive ? "+" : ""}
        {format(gl, "USD")} ({isPositive ? "+" : ""}
        {gainPercent(item).toFixed(2)}%)
      </span>
    );
  };

  return (
    <Table
      variant="container"
      trackBy="id"
      items={HOLDINGS}
      columnDefinitions={[
        {
          id: "name",
          header: t("investments.holding"),
          cell: (item) => item.name,
          isRowHeader: true,
        },
        {
          id: "shares",
          header: t("investments.shares"),
          cell: (item) => item.shares.toLocaleString(),
        },
        {
          id: "avgPrice",
          header: t("investments.avgPrice"),
          cell: (item) => format(item.avgPrice, "USD"),
        },
        {
          id: "currentPrice",
          header: t("investments.currentPrice"),
          cell: (item) => format(item.currentPrice, "USD"),
        },
        { id: "marketValue", header: t("investments.marketValue"), cell: amountCell },
        { id: "gainLoss", header: t("investments.gainLoss"), cell: gainCell },
        {
          id: "allocation",
          header: t("investments.allocation"),
          cell: (item) => `${item.allocation}%`,
        },
      ]}
      header={
        <Header variant="h2" counter={`(${HOLDINGS.length})`}>
          {t("investments.holdings")}
        </Header>
      }
    />
  );
}

export function InvestmentsPageClient() {
  const { t } = useTranslation();
  const { format } = useCurrencyFormatter();
  const isReturnPositive = PORTFOLIO_SUMMARY.returnPercentage >= 0;

  return (
    <AppLayout
      navigation={<PremiumSideNav />}
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" description={t("investments.description")}>
              {t("investments.title")}
            </Header>
          }
        >
          <motion.div
            className={styles.summaryGrid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>{t("investments.totalPortfolioValue")}</div>
              <div className={styles.summaryValue}>
                {format(PORTFOLIO_SUMMARY.totalValue, "USD")}
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>{t("investments.totalInvested")}</div>
              <div className={styles.summaryValue}>
                {format(PORTFOLIO_SUMMARY.totalInvested, "USD")}
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>{t("investments.totalReturn")}</div>
              <div
                className={`${styles.summaryValue} ${isReturnPositive ? styles.returnPositive : styles.returnNegative}`}
              >
                {isReturnPositive ? "+" : ""}
                {format(PORTFOLIO_SUMMARY.totalReturn, "USD")}
              </div>
              <div
                className={`${styles.returnBadge} ${isReturnPositive ? styles.returnPositive : styles.returnNegative}`}
              >
                {isReturnPositive ? "+" : ""}
                {PORTFOLIO_SUMMARY.returnPercentage.toFixed(2)}%
              </div>
            </div>
            <div className={styles.summaryCard}>
              <div className={styles.summaryLabel}>{t("investments.riskScore")}</div>
              <div className={styles.summaryValue}>{PORTFOLIO_SUMMARY.riskScore}</div>
              <div className={styles.summaryMeta}>
                {PORTFOLIO_SUMMARY.diversification} {t("investments.holdings")}
              </div>
            </div>
          </motion.div>

          <div className={styles.chartsGrid}>
            <PerformanceChart />
            <SectorDonut />
          </div>

          <div className={styles.tableSection}>
            <HoldingsTable />
          </div>
        </ContentLayout>
      }
    />
  );
}
