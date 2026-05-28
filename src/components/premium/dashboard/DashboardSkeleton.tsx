import styles from "./DashboardSkeleton.module.scss";

export function DashboardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.hero}>
        <div
          className="premium-shimmer-dark skeleton-block"
          style={{ width: 140, height: 14, marginBottom: 16 }}
        />
        <div
          className="premium-shimmer-dark skeleton-block"
          style={{ width: 260, height: 40, marginBottom: 12 }}
        />
        <div className="premium-shimmer-dark skeleton-block" style={{ width: 180, height: 12 }} />
      </div>

      <div className={styles.kpiGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="premium-shimmer-dark skeleton-block"
            style={{ height: 100, borderRadius: 12 }}
          >
            <div
              className="premium-shimmer-dark"
              style={{ width: 90, height: 10, marginBottom: 12, borderRadius: 4 }}
            />
            <div
              className="premium-shimmer-dark"
              style={{ width: 130, height: 24, marginBottom: 8, borderRadius: 6 }}
            />
            <div
              className="premium-shimmer-dark"
              style={{ width: 100, height: 10, borderRadius: 4 }}
            />
          </div>
        ))}
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.chartCol}>
          <div
            className="premium-shimmer-dark skeleton-block"
            style={{ width: 140, height: 14, marginBottom: 20 }}
          />
          <div
            className="premium-shimmer-dark skeleton-block"
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
        </div>
        <div className={styles.chartCol}>
          <div
            className="premium-shimmer-dark skeleton-block"
            style={{ width: 140, height: 14, marginBottom: 20 }}
          />
          <div
            className="premium-shimmer-dark skeleton-block"
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
        </div>
      </div>

      <div className={styles.cardGrid}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="premium-shimmer-dark skeleton-block"
            style={{ height: 200, borderRadius: 14 }}
          />
        ))}
      </div>
    </div>
  );
}
