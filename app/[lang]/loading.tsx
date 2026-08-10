import { Sk } from "../components/ui/Skeleton";
import s from "../components/ui/Skeleton.module.css";

export default function HomeLoading() {
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

      {/* ── HERO SLIDER ────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "clamp(420px, 60dvh, 640px)" }}>
        <Sk w="100%" h="100%" r="0" />
        {/* overlay content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "center",
          padding: "0 80px", gap: 20,
        }}>
          <Sk w="120px" h="24px" r="20px" style={{ opacity: 0.35 }} />
          <Sk w="520px" h="52px" r="10px" style={{ opacity: 0.3 }} />
          <Sk w="380px" h="52px" r="10px" style={{ opacity: 0.3 }} />
          <Sk w="280px" h="18px" r="6px"  style={{ opacity: 0.25 }} />
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Sk w="160px" h="50px" r="12px" style={{ opacity: 0.3 }} />
            <Sk w="130px" h="50px" r="12px" style={{ opacity: 0.25 }} />
          </div>
        </div>
        {/* pagination dots */}
        <div style={{
          position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 8,
        }}>
          {[1,2,3,4].map(i => (
            <Sk key={i} w={i === 1 ? "28px" : "8px"} h="8px" r="4px" style={{ opacity: 0.35 }} />
          ))}
        </div>
      </div>

      {/* ── HERO QUICK NAV ─────────────────────────────── */}
      <div style={{
        display: "flex", gap: 10, justifyContent: "center",
        padding: "20px 40px",
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
        flexWrap: "wrap",
      }}>
        {[140, 120, 160, 130, 145].map((w, i) => (
          <Sk key={i} w={`${w}px`} h="40px" r="20px" />
        ))}
      </div>

      {/* ── CAMPUS LOCATION SECTION ────────────────────── */}
      <div style={{ padding: "80px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <Sk.Badge />
          <div style={{ marginTop: 14 }}>
            <Sk.Title w="45%" />
          </div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <Sk.Line w="70%" />
            <Sk.Line w="55%" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              borderRadius: 16, overflow: "hidden",
              border: "1px solid var(--border-subtle)",
            }}>
              <Sk w="100%" h="200px" r="0" />
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                <Sk h="20px" w="60%" r="6px" />
                <Sk.Line w="90%" />
                <Sk.Line w="75%" />
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <Sk w="100px" h="34px" r="8px" />
                  <Sk w="34px"  h="34px" r="8px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STUDENT REVIEWS ────────────────────────────── */}
      <div style={{
        padding: "80px 60px",
        background: "var(--bg-surface-alt)",
        maxWidth: "100%",
      }}>
        <div style={{ textAlign: "center", marginBottom: 48, maxWidth: 800, margin: "0 auto 48px" }}>
          <div style={{ margin: "0 auto", width: "50%" }}><Sk.Title w="100%" /></div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <Sk.Line w="60%" />
          </div>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20, maxWidth: 1400, margin: "0 auto",
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              borderRadius: 20, padding: 28,
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(s => <Sk key={s} w="16px" h="16px" r="3px" />)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Sk.Line w="100%" />
                <Sk.Line w="95%" />
                <Sk.Line w="80%" />
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 4 }}>
                <Sk.Circle size={44} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Sk h="14px" w="110px" r="4px" />
                  <Sk h="12px" w="80px"  r="4px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COURSE HIGHLIGHT TABS ──────────────────────── */}
      <div style={{ padding: "80px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 32 }}>
          {[120, 110, 130, 125].map((w, i) => (
            <Sk key={i} w={`${w}px`} h="40px" r="20px" />
          ))}
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr",
          gap: 0, borderRadius: 20, overflow: "hidden", minHeight: 360,
        }}>
          <Sk w="100%" h="360px" r="0" />
          <div style={{
            border: "1px solid var(--border-subtle)", padding: 40,
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <Sk.Badge />
            <Sk.Title w="70%" />
            <Sk.Line w="90%" />
            <Sk.Line w="80%" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Sk w="28px" h="28px" r="8px" />
                  <Sk.Line w="70%" />
                </div>
              ))}
            </div>
            <div style={{ marginTop: "auto" }}>
              <Sk.Btn w="180px" h="48px" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
