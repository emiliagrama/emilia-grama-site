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

     <section className="section projectsSection">
  <div className="container">
    <h2 className="h2">Selected projects</h2>
    <p className="sectionLead">Each project solves a real problem.</p>

    <div className="projectsGrid">
      <article className="projectCard projectHotel">
        <div className="projectMedia">
          <div className="projectThumbPlaceholder" />
        </div>

        <div className="projectBody">
          <p className="projectKicker">Hotel & Spa Website</p>
          <h3 className="projectTitle">Hotel Vacanța</h3>
          <p className="projectDesc">
            Hotel & spa website with a modern-retro (90s) atmosphere — fast, clear, and built for direct enquiries.
          </p>

          <div className="projectActions">
            <a className="projectLink" href="https://www.hotelvacanta.ro/" target="_blank" rel="noreferrer">
              View project <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>

      <article className="projectCard">
        <div className="projectMedia projectMusic">
          <div className="projectThumbPlaceholder" />
        </div>

        <div className="projectBody">
          <p className="projectKicker">Cinematic Music Portfolio</p>
          <h3 className="projectTitle">Hugo Figuera</h3>
          <p className="projectDesc">
            Cinematic composer portfolio with immersive visuals and interactive audio — designed to showcase identity and work.
          </p>

          <div className="projectActions">
            <a className="projectLink" href="https://www.hugofigueramusic.com/" target="_blank" rel="noreferrer">
              View project <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </article>
    </div>

    <p className="projectsNote">More projects available on request.</p>
  </div>
</section>

      
    </main>
  );
}
