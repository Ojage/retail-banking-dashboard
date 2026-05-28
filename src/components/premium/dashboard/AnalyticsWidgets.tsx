"use client";

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter";
import { useGetAnalyticsDataQuery } from "@/store/api/bankingApi";

import styles from "./AnalyticsWidgets.module.scss";

function ExpenseDonutChart({
  data,
}: {
  data: Array<{ name: string; value: number; color: string }>;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>Expense Breakdown</span>
        <span className={styles.chartTotal}>${total.toLocaleString()}</span>
      </div>
      <div className={styles.donutContainer}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                fontSize: 12,
                color: "white",
              }}
              formatter={(value) => [`$${(Number(value) || 0).toLocaleString()}`, "Amount"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.donutLegend}>
          {data.map((item) => (
            <div key={item.name} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: item.color }} />
              <span className={styles.legendLabel}>{item.name}</span>
              <span className={styles.legendValue}>${item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BalanceAreaChart({ data }: { data: Array<{ date: string; balance: number }> }) {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>Balance Growth</span>
        <span className={styles.chartPeriod}>Last 6 months</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
              color: "white",
            }}
            formatter={(value) => [`$${(Number(value) || 0).toLocaleString()}`, "Balance"]}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#balanceGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#6366f1", stroke: "#1e293b", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function TransferBarChart({
  data,
}: {
  data: Array<{ month: string; incoming: number; outgoing: number }>;
}) {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>Monthly Transfers</span>
        <span className={styles.chartPeriod}>Incoming vs Outgoing</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12,
              color: "white",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
            iconType="circle"
            iconSize={8}
          />
          <Bar
            dataKey="incoming"
            name="Incoming"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="outgoing"
            name="Outgoing"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function KpiCards({
  data,
}: {
  data: Array<{
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    trend: number;
    trendLabel: string;
    format: string;
  }>;
}) {
  const { format: formatCurrency } = useCurrencyFormatter();

  return (
    <div className={styles.kpiGrid}>
      {data.map((kpi, idx) => {
        let displayValue: string;
        if (kpi.format === "currency") {
          displayValue = formatCurrency(kpi.value, "USD");
        } else if (kpi.format === "percentage") {
          displayValue = `${kpi.value.toFixed(1)}%`;
        } else {
          displayValue = kpi.value.toLocaleString();
        }

        const isPositive = kpi.trend >= 0;

        return (
          <motion.div
            key={kpi.label}
            className={styles.kpiCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
          >
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiValue}>{displayValue}</div>
            <div className={styles.kpiTrend}>
              <span className={`${styles.kpiChange} ${isPositive ? styles.kpiUp : styles.kpiDown}`}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isPositive ? (
                    <polyline points="18 15 12 9 6 15" />
                  ) : (
                    <polyline points="6 9 12 15 18 9" />
                  )}
                </svg>
                {Math.abs(kpi.trend)}%
              </span>
              <span className={styles.kpiPeriod}>{kpi.trendLabel}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className={styles.widgetsGrid}>
      <div className={styles.chartSkeleton}>
        <div
          className="premium-shimmer-dark"
          style={{ width: 140, height: 14, marginBottom: 20, borderRadius: 4 }}
        />
        <div
          className="premium-shimmer-dark"
          style={{ width: "100%", height: 200, borderRadius: 8 }}
        />
      </div>
      <div className={styles.chartSkeleton}>
        <div
          className="premium-shimmer-dark"
          style={{ width: 140, height: 14, marginBottom: 20, borderRadius: 4 }}
        />
        <div
          className="premium-shimmer-dark"
          style={{ width: "100%", height: 200, borderRadius: 8 }}
        />
      </div>
      <div className={styles.chartSkeleton}>
        <div
          className="premium-shimmer-dark"
          style={{ width: 140, height: 14, marginBottom: 20, borderRadius: 4 }}
        />
        <div
          className="premium-shimmer-dark"
          style={{ width: "100%", height: 200, borderRadius: 8 }}
        />
      </div>
      <div className={styles.kpiSkeletonGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.chartSkeleton}>
            <div
              className="premium-shimmer-dark"
              style={{ width: 100, height: 12, marginBottom: 12, borderRadius: 4 }}
            />
            <div
              className="premium-shimmer-dark"
              style={{ width: 140, height: 28, marginBottom: 8, borderRadius: 6 }}
            />
            <div
              className="premium-shimmer-dark"
              style={{ width: 120, height: 10, borderRadius: 4 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsWidgets() {
  const { data, isLoading } = useGetAnalyticsDataQuery();

  if (isLoading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <motion.div
      className={styles.widgetsGrid}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className={styles.chartCol1}>
        <KpiCards data={data.kpis} />
      </div>
      <div className={styles.chartCol2}>
        <ExpenseDonutChart data={data.expenseCategories} />
        <BalanceAreaChart data={data.balanceHistory} />
      </div>
      <div className={styles.chartCol3}>
        <TransferBarChart data={data.monthlyTransfers} />
      </div>
    </motion.div>
  );
}
