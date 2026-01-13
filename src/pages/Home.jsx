export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="section" style={{ paddingTop: 90, paddingBottom: 220 }}>
        <div className="container">
          {/* keep heroText but make it a tighter column */}
          <div className="heroText" style={{ maxWidth: 760 }}>
            <p className="p" style={{ margin: 0 }}>
              Web developer • UI engineering • Modern React
            </p>

            <h1 className="h1" style={{ marginTop: 16 }}>
              Make it <span style={{ color: "var(--spot3)" }}>creative</span>.
              <br />
              Make it <span style={{ color: "var(--spot3)" }}>clean</span>.
            </h1>

            <p
              className="p"
              style={{
                fontSize: 17,
                marginTop: 18,
                maxWidth: 680,
              }}
            >
              I design and build fast, elegant websites and interactive UI components — with a
              premium feel and a strong technical base.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a className="btn btnPrimary" href="#projects">
                View work
              </a>
              <a className="btn" href="/components">
                Explore components
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor point */}
      <div id="projects" />

      {/* PROJECTS (starts on calm dark area) */}
      <section className="section" style={{ paddingTop: 90 }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <h2 className="h2" style={{ color: "var(--textLight)" }}>
              Featured projects
            </h2>
            <p className="p" style={{ color: "var(--mutedLight)" }}>
              We’ll add your 2–4 best projects as big frames.
            </p>
          </div>

          {/* placeholder “frame” area so it looks intentional */}
          <div
            style={{
              marginTop: 28,
              height: 220,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
            }}
          />
        </div>
      </section>
    </main>
  );
}
