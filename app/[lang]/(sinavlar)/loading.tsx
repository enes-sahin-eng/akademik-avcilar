import { Sk } from "../../components/ui/Skeleton";
import s from "../../components/ui/Skeleton.module.css";

export default function SinavLoading() {
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

      {/* ── EXAM HERO ──────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(320px, 46dvh, 480px)" }}>
        <Sk w="100%" h="100%" r="0" />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "center",
          padding: "0 80px", gap: 16,
        }}>
          <Sk w="110px" h="22px" r="20px" style={{ opacity: 0.3 }} />
          <Sk w="440px" h="48px" r="10px" style={{ opacity: 0.28 }} />
          <Sk w="320px" h="48px" r="10px" style={{ opacity: 0.26 }} />
          <Sk w="260px" h="16px" r="5px"  style={{ opacity: 0.2 }} />
          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <Sk w="160px" h="48px" r="12px" style={{ opacity: 0.28 }} />
          </div>
        </div>
      </div>

      {/* ── EXAM INFO CARDS ────────────────────────────── */}
      <div style={{ padding: "56px 60px 0", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              borderRadius: 16, padding: 24,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              <Sk w="40px" h="40px" r="10px" />
              <Sk h="18px" w="70%" r="5px" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Sk.Line w="95%" />
                <Sk.Line w="75%" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXAM CONTENT / WHY US ──────────────────────── */}
      <div style={{ padding: "64px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 48, alignItems: "center",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Sk.Badge />
            <Sk.Title w="80%" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              <Sk.Line w="100%" />
              <Sk.Line w="90%" />
              <Sk.Line w="75%" />
            </div>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Sk w="24px" h="24px" r="50%" />
                <Sk.Line w="70%" />
              </div>
            ))}
            <div style={{ marginTop: 8 }}>
              <Sk.Btn w="180px" h="48px" />
            </div>
          </div>
          <Sk w="100%" h="360px" r="16px" />
        </div>
      </div>

      {/* ── EDUCATION MODELS ───────────────────────────── */}
      <div style={{
        padding: "64px 60px",
        background: "var(--bg-surface-alt)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <Sk.Title w="38%" />
            <div style={{ marginTop: 10 }}>
              <Sk.Line w="55%" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                borderRadius: 16, overflow: "hidden",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
              }}>
                <Sk w="100%" h="160px" r="0" />
                <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  <Sk h="18px" w="65%" r="5px" />
                  <Sk.Line w="90%" />
                  <Sk.Line w="70%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────── */}
      <div style={{ padding: "64px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <Sk.Title w="35%" />
        </div>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            borderBottom: "1px solid var(--border-subtle)",
            padding: "18px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Sk h="16px" w={`${50 + i * 7}%`} r="5px" />
            <Sk w="20px" h="20px" r="4px" />
          </div>
        ))}
      </div>

    </div>
  );
}
