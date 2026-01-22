import { useEffect, useRef } from "react";

export default function Home() {
  const componentsSectionRef = useRef(null);
  const componentsTrackRef = useRef(null);

  useEffect(() => {
    const section = componentsSectionRef.current;
    const track = componentsTrackRef.current;
    if (!section || !track) return;

    const scrollEl = section.querySelector(".componentsScroll");
    if (!scrollEl) return;

    let raf = 0;
    let maxTranslate = 0;
    let startY = 0;

    const clamp01 = (n) => Math.max(0, Math.min(1, n));

   const measure = () => {
  const viewportWidth = scrollEl.clientWidth;
  maxTranslate = Math.max(0, track.scrollWidth - viewportWidth);

  startY = section.getBoundingClientRect().top + window.scrollY;

  // how tall is the sticky “viewport” where cards are shown
  const scrollH = scrollEl.getBoundingClientRect().height;

  // header height (title + subtitle)
  const headerEl = section.querySelector(".componentsHeader");
  const headerH = headerEl ? headerEl.getBoundingClientRect().height : 0;

  // section padding (top + bottom)
  const cs = getComputedStyle(section);
  const padTop = parseFloat(cs.paddingTop) || 0;
  const padBot = parseFloat(cs.paddingBottom) || 0;

  // small breathing room so it doesn’t snap tight
  const extra = 24;

  section.style.height = `${headerH + scrollH + maxTranslate + padTop + padBot + extra}px`;
};


    const update = () => {
      raf = 0;

      if (maxTranslate <= 0) {
        track.style.transform = `translate3d(0,0,0)`;
        return;
      }

      const y = window.scrollY - startY;
      const progress = clamp01(y / maxTranslate);

      const x = -(progress * maxTranslate);
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      update();
    };

    // Re-measure when track/viewport changes (images loading, fonts, etc.)
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(track);
    ro.observe(scrollEl);

    // Initial measure after layout paints
    requestAnimationFrame(() => {
      measure();
      update();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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

    <section className="componentsSection" ref={componentsSectionRef}>
  <div className="container">

    <header className="componentsHeader">
      <h2>UI Components</h2>
      <p>Reusable interface elements and interaction patterns.</p>
    </header>

    {/* Scroll-driven horizontal area */}
    <div className="componentsScroll">
      <div className="componentsTrack" ref={componentsTrackRef}>

        {/* Component card */}
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
    </div>

    {/* CTA */}
    <div className="componentsCTA">
      <a href="/components" className="btn">
        View all components →
      </a>
    </div>

  </div>
</section>
  
    </main>
    
  );
}
