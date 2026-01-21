export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="heroMeta">Full-Stack Web Developer — Modern web applications</p>

          <h1 className="heroTitle">
            Design and code  <span>- end to end</span>
          </h1>

          <p className="heroDesc">
            From idea to production. Clear decisions. No noise.
          </p>

          <div className="heroActions">
            <a className="btn btnGold" href="/components">UI experiments</a>
            <a className="btn" href="#projects"> View my work  </a>
          </div>
        </div>
      </section>

      <div id="projects" />
      <section className="section">
        <div className="container">
          <h2 className="h2">Featured projects</h2>
          <p className="p">We’ll add your 2–4 best projects as big frames.</p>

          <div className="framePlaceholder" />
        </div>
      </section>
    </main>
  );
}
