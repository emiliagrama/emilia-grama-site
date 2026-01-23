
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

     <section id="projects" className="section projectsSection">
  <div className="container">
    <h2 className="h2">Selected projects</h2>
    <p className="sectionLead">Digital experiences crafted with purpose, atmosphere, and precision.</p>

    <div className="projectsGrid">
      <article className="projectCard projectHotel">
        <div className="projectMedia">
          <div className="projectThumbPlaceholder" />
        </div>

        <div className="projectBody">
          <p className="projectKicker">Hotel & Spa Website</p>
          <h3 className="projectTitle">Hotel Vacanța</h3>
          <p className="projectDesc">
           Modern-retro hotel & spa website designed for clarity, performance, and direct enquiries.
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
          Sci-fi inspired cinematic music portfolio blending immersive visuals with interactive audio          </p>

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

    {/*UI COMPONENTS SECTION */}
<section className="componentsSection" aria-label="UI Components">
  <div className="container">
    <header className="componentsHeader">
      <h2>UI Components</h2>
      <p>Reusable interface elements and interaction patterns.</p>
    </header>

    <div className="componentsScroll" aria-label="Component carousel">
      {/* Track 1 (original set) */}
      <div className="componentsTrack">
        <article className="componentCard">
          <img src="/images/components/button.jpg" alt="Button component" />
          <h3>Buttons</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/cards.jpg" alt="Card component" />
          <h3>Cards</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/forms.jpg" alt="Form fields" />
          <h3>Inputs</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/hover.jpg" alt="Hover effects" />
          <h3>Hover Effects</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/animation.jpg" alt="Animations" />
          <h3>Animations</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/navigation.jpg" alt="Navigation" />
          <h3>Navigation</h3>
        </article>
      </div>

      {/* Track 2 (clone) for seamless infinite loop */}
      <div className="componentsTrack" aria-hidden="true">
        <article className="componentCard">
          <img src="/images/components/button.jpg" alt="" />
          <h3>Buttons</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/cards.jpg" alt="" />
          <h3>Cards</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/forms.jpg" alt="" />
          <h3>Inputs</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/hover.jpg" alt="" />
          <h3>Hover Effects</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/animation.jpg" alt="" />
          <h3>Animations</h3>
        </article>

        <article className="componentCard">
          <img src="/images/components/navigation.jpg" alt="" />
          <h3>Navigation</h3>
        </article>
      </div>
    </div>

    <div className="componentsCTA">
      <a className="btn btnGold" href="/components">View all components →</a>
      
    </div>
  </div>
</section>
    </main>
    
  );
}
