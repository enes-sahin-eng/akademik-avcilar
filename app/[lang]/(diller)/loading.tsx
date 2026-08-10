import { Sk } from "../../components/ui/Skeleton";
import s from "../../components/ui/Skeleton.module.css";

export default function CourseLoading() {
  return (
    <div className={s.page}>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <div style={{
        height: 68,
        borderBottom: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "var(--bg-surface)",
      }}>
        <Sk w="130px" h="32px" r="6px" />
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[100, 80, 90, 75].map((w, i) => (
            <Sk key={i} w={`${w}px`} h="14px" r="4px" />
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Sk w="100px" h="38px" r="10px" />
          <Sk w="38px"  h="38px" r="50%" />
        </div>
      </div>

      {/* ── COURSE HERO SLIDER ─────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(340px, 50dvh, 520px)" }}>
        <Sk w="100%" h="100%" r="0" />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "center",
          padding: "0 80px", gap: 16,
        }}>
          <Sk w="100px" h="22px" r="20px" style={{ opacity: 0.3 }} />
          <Sk w="480px" h="48px" r="10px" style={{ opacity: 0.28 }} />
          <Sk w="340px" h="48px" r="10px" style={{ opacity: 0.28 }} />
          <Sk w="300px" h="16px" r="5px"  style={{ opacity: 0.22 }} />
          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <Sk w="150px" h="48px" r="12px" style={{ opacity: 0.28 }} />
            <Sk w="120px" h="48px" r="12px" style={{ opacity: 0.22 }} />
          </div>
        </div>
      </div>

      {/* ── COURSE INFO CARDS ──────────────────────────── */}
      <div style={{ padding: "60px 60px 0", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              borderRadius: 16, padding: 20,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <Sk w="36px" h="36px" r="10px" />
              <Sk h="16px" w="80%" r="5px" />
              <Sk h="13px" w="60%" r="4px" />
            </div>
          ))}
        </div>
      </div>

      {/* ── GRADE LEVEL TABS ───────────────────────────── */}
      <div style={{ padding: "64px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <Sk.Badge />
          <div style={{ marginTop: 14 }}>
            <Sk.Title w="40%" />
          </div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <Sk.Line w="65%" />
            <Sk.Line w="50%" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[110, 100, 130, 95, 115].map((w, i) => (
            <Sk key={i} w={`${w}px`} h="38px" r="20px" />
          ))}
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 24, minHeight: 280,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Sk w="20px" h="20px" r="50%" style={{ marginTop: 2 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  <Sk.Line w={`${70 + i * 5}%`} />
                  <Sk h="12px" w="50%" r="4px" />
                </div>
              </div>
            ))}
          </div>
          <Sk w="100%" h="280px" r="16px" />
        </div>
      </div>

      {/* ── PUBLICATIONS / BOOKS ───────────────────────── */}
      <div style={{
        padding: "64px 60px",
        background: "var(--bg-surface-alt)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <Sk.Title w="35%" />
          </div>
          <div style={{ display: "flex", gap: 20, overflowX: "hidden" }}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{ flexShrink: 0, width: 180, display: "flex", flexDirection: "column", gap: 10 }}>
                <Sk w="180px" h="240px" r="10px" />
                <Sk h="13px" w="80%" r="4px" />
                <Sk h="11px" w="55%" r="4px" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────── */}
      <div style={{ padding: "64px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <Sk.Title w="40%" />
        </div>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            borderBottom: "1px solid var(--border-subtle)",
            padding: "18px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Sk h="16px" w={`${55 + i * 6}%`} r="5px" />
            <Sk w="20px" h="20px" r="4px" />
          </div>
        ))}
      </div>

    </div>
  );
}
