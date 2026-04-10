import { useEffect, useMemo, useRef } from "react";
import InteractiveShowcaseSection from "../components/home/InteractiveShowcaseSection";
export default function Home() {
  /* ===============================
     DATA
  =============================== */

  const componentCards = [
    { img: "/images/universe/buttons.jpg", title: "Buttons", alt: "Button experiments" },
    { img: "/images/universe/cards.jpg", title: "Cards", alt: "Card experiments" },
    { img: "/images/universe/form.jpg", title: "Forms", alt: "Form experiments" },
    { img: "/images/universe/navbars.jpg", title: "Navbars", alt: "Navbar experiments" },
    { img: "/images/universe/player.jpg", title: "Players", alt: "Player experiments" },
    { img: "/images/universe/lab.jpg", title: "Lab", alt: "Lab" },
  ];

  const heroDescText = "From idea to production. Clear decisions. No noise.";

  /* ===============================
     HERO ANIMATION
  =============================== */

  const heroDescRef = useRef(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      heroDescRef.current?.classList.add("heroDesc--ready");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const heroDescAnimated = useMemo(() => {
    const words = heroDescText.split(" ");
    let globalIndex = 0;
    const baseDelay = 0.12;
    const step = 0.03;

    return words.map((word, wIndex) => (
      <span
        key={wIndex}
        className="heroDescWord"
        style={{ marginRight: wIndex === words.length - 1 ? 0 : "0.35em" }}
      >
        {Array.from(word).map((char, cIndex) => {
          const delay = baseDelay + globalIndex * step;
          globalIndex += 1;

          return (
            <span
              key={`${wIndex}-${cIndex}`}
              className="heroDescLetter"
              style={{ animationDelay: `${delay}s` }}
            >
              {char}
            </span>
          );
        })}
      </span>
    ));
  }, [heroDescText]);

    /* ===============================
      EXPERIMENTS MARQUEE (NO JUMP)
    =============================== */
  const experimentsScrollRef = useRef(null);
  const experimentsTrackRef = useRef(null);
  const experimentsSetRef = useRef(null);

  const rafId = useRef(null);
  const offsetPx = useRef(0);
  const pausedRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    // Avoid double-start in dev / hot reload / StrictMode weirdness
    if (startedRef.current) return;
    startedRef.current = true;

    const scrollEl = experimentsScrollRef.current;
    const trackEl = experimentsTrackRef.current;
    const setEl = experimentsSetRef.current;
    if (!scrollEl || !trackEl || !setEl) return;

    // Mobile: let native horizontal scroll handle it
    if (window.matchMedia("(max-width: 860px)").matches) return;

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReducedMotion) return;

    const speed = 40; // px/sec
    let distance = Math.max(1, Math.round(setEl.getBoundingClientRect().width));
    let last = performance.now();

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; last = performance.now(); };

    scrollEl.addEventListener("mouseenter", onEnter);
    scrollEl.addEventListener("mouseleave", onLeave);

    const setDistanceSafely = () => {
      distance = Math.max(1, Math.round(setEl.getBoundingClientRect().width));
      offsetPx.current = offsetPx.current % distance;
    };

    const ro = new ResizeObserver(() => requestAnimationFrame(setDistanceSafely));
    ro.observe(setEl);

    const tick = (t) => {
      const dt = t - last;
      last = t;

      if (!pausedRef.current) {
        offsetPx.current += (speed * dt) / 1000;
        if (offsetPx.current >= distance) offsetPx.current -= distance;
        trackEl.style.transform = `translate3d(${-Math.round(offsetPx.current)}px,0,0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      ro.disconnect();
      scrollEl.removeEventListener("mouseenter", onEnter);
      scrollEl.removeEventListener("mouseleave", onLeave);
      startedRef.current = false;
    };
  }, []);

  /* ===============================
     RENDER
  =============================== */

  return (
    <main>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container">
          <p className="heroMeta">
            Full-Stack Web Developer — Modern web applications
          </p>

          <h1 className="heroTitle">
            Design and code <span>- end to end</span>
          </h1>

          <p ref={heroDescRef} className="heroDesc">
            {heroDescAnimated}
          </p>
          <p className="heroSubnote">Custom-built. No shortcuts.</p>
          <div className="heroActions">
            <a className="btn btnBlue" href="#projects">
              View my work
            </a>
            <a className="btn" href="/experiments" style={{ border: "1px solid rgba(255, 255, 255, 0.03)" }}>
              UI experiments
            </a>
          </div>
        </div>
      </section>

     {/* ================= INTERACTIVE SHOWCASE ================= */}
      <InteractiveShowcaseSection />

      {/* ================= PROJECTS ================= */}
      <section id="projects" className="section projectsSection">
        <div className="container">
          <h2 className="h2">Selected projects</h2>
          <p className="sectionLead">
            Digital experiences crafted with purpose, atmosphere, and precision.
          </p>

          <div className="projectsGrid">

            <article className="projectCard projectHotel">
              <div className="projectMedia">
                <div className="projectThumbPlaceholder" />
              </div>

              <div className="projectBody">
                <p className="projectKicker">Hotel & Spa Website</p>
                <h3 className="projectTitle">Hotel Vacanța</h3>
                <p className="projectDesc">
                  Modern-retro hotel & spa website designed for clarity and
                  performance.
                </p>
                <p className="projectDesc2"> Rails application with dynamic offer filtering, structured DB logic, and analytics tracking.
                </p>

                <div className="projectActions">
                  <a
                    className="projectLink"
                    href="https://www.hotelvacanta.ro/"
                    target="_blank"
                    rel="noreferrer"
                  >
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
                  Sci-fi inspired cinematic music portfolio blending immersive visuals. 
                </p> 
                <p className="projectDesc2">React + Vite portfolio with custom audio player, performance tuning, and interactive UI system.
                </p>

                <div className="projectActions">
                  <a
                    className="projectLink"
                    href="https://www.hugofigueramusic.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View project <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>

          </div>

          <p className="projectsNote">
            More projects available on request.
          </p>
          <div className="sectionCTA">
            <a className="btn btnBlue" href="/contact">
              Get in touch
            </a>
          </div>
          </div>
      </section>

      {/* ================= EXPERIMENTS ================= */}
      <section className="experimentsSection" aria-label="UI Experiments">
        <div className="container">

          <header className="experimentsHeader">
            <h2>UI Experiments</h2>
            <p className="sectionLead">
              Reusable UI system built in React. Component-driven architecture and interaction patterns.</p>
          </header>

          <div
            ref={experimentsScrollRef}
            className="experimentsScroll"
            aria-label="Experiment carousel"
          >
            <div ref={experimentsTrackRef} className="experimentsTrack">
              <div ref={experimentsSetRef} className="experimentsSet">
                {/* ORIGINAL SET */}
                {componentCards.map((c) => (
                  <article className="componentCard" key={c.title}>
                    <div className="componentPreview">
                      <img
                        src={c.img}
                        alt={c.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="componentCardContent">
                      <h3>{c.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
              <div className="experimentsSet" aria-hidden="true">
                {/* DUPLICATE SET (aria hidden) */}
                {componentCards.map((c, idx) => (
                  <article
                    className="componentCard"
                    key={`${c.title}-dup-${idx}`}
                    aria-hidden="true"
                  >
                    <div className="componentPreview">
                      <img
                        src={c.img}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="componentCardContent">
                      <h3>{c.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
              {/* 🔥 THIS MUST BE HERE */}
            <div className="experimentsFog" aria-hidden="true" />
            </div>
            <div className="sectionCTA">
              <a className="btn btnBlue" href="/experiments">
                View all experiments →
              </a>
            </div>
        </div>
      </section>

    </main>
  );
}