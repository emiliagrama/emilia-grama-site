import { useEffect, useMemo, useRef } from "react";
import InteractiveShowcaseSection from "../components/home/InteractiveShowcaseSection";
export default function Home() {
  /* ===============================
     DATA
  =============================== */

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
            <a className="btn" href="/lab" style={{ border: "1px solid rgba(255, 255, 255, 0.03)" }}>
              UI Lab
            </a>
          </div>
        </div>
      </section>


      {/* ================= PROJECTS ================= */}
      <section id="projects" className="section projectsSection">
        <div className="container">
          <h2 className="h2">Selected projects</h2>
          <p className="sectionLead">
            Digital experiences crafted with purpose, atmosphere, and precision.
          </p>

          <div className="projectsGrid">

            <article className="projectCard projectLesnoise">
              <div className="projectMedia">
                <div className="projectThumbPlaceholder" />
              </div>

              <div className="projectBody">
                <p className="projectKicker">Website Review Platform</p>
                <h3 className="projectTitle">LesNoise</h3>

                <p className="projectDesc">
                  Real-time website review tool for developers and clients. No more screenshots.
                </p>

                <p className="projectDesc2">
                  React + Rails application with authentication, shareable client reviews,
                    real-time comments, PostgreSQL, ActionCable, and Redis.     
                </p>

                <div className="projectActions">
                  <a
                    className="projectLink"
                    href="https://lesnoise.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View project <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>

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
                <p className="projectDesc2"> Rails application with API integration, dynamic offer filtering, structured database logic, and analytics tracking.
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
                  Sci-fi inspired music portfolio combining cinematic visuals, motion, and audio. 
                </p> 
                <p className="projectDesc2">React + Vite portfolio with custom waveform audio player, performance tuning, and interactive UI system.
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

          </div>
      </section>

      {/*================CODE IS ONLY PART OF IT=================*/}
      <section className="section beyondCodeSection">
        <div className="container">
          <header className="beyondCodeHeader">

            <h2 className="beyondCodeTitle">
              Code is only <span> part of the story</span>
            </h2>

            <p className="beyondCodeLead">
              Good products need clear decitions before launch — and attention after it.
            </p>
          </header>

          <div className="beyondCodelist">

            <article className="beyondCodeRow">
              <span className="beyondCodeNumber" area-hidden="true">
                01
              </span>

              <h3 className="beyondCodeRowTitle">
                Technical guidance
              </h3>

              <p className="beyondCodeText">
                Turn ideas and business needs into a clear technical direction.
                Define features, priorities and the right approach before development begins.
              </p>
            </article>

            <article className="beyondCodeRow">
              <span className="beyondCodeNumber" aria-hidden="true">
                02
              </span>

              <h3 className="beyondCodeRowTitle">
                Full-stack development
              </h3>

              <p className="beyondCodeText">
                Responsive interfaces, backend logic, databases, APIs and deployment —
                complete web products built for real-world use.
              </p>
            </article>

            <article className="beyondCodeRow">
              <span className="beyondCodeNumber" aria-hidden="true">
                03
              </span>

              <h3 className="beyondCodeRowTitle">
                Ship &amp; maintain
              </h3>

              <p className="beyondCodeText">
                Launch, updates, fixes, performance improvements and ongoing support
                as the product evolves.
              </p>
            </article>
            
            <div className="beyondCodeStack" aria-label="Tech stack">
                <span>React</span>
                <span>Ruby on Rails</span>
                <span>JavaScript</span>
                <span>PostgreSQL</span>
                <span>APIs</span>
                <span>Figma</span>
                <span>Git</span>
                <span>Heroku</span>
                <span>Vercel</span>
            </div>
            
          </div>
        </div>

      </section>

           {/* ================= INTERACTIVE SHOWCASE ================= */}
      <InteractiveShowcaseSection />

          {/* ================= FINAL CTA ================= */}
      <section className="finalCta">
        <div className="container finalCtaInner">

          <div className="finalCtaCopy">
            <h2>Your thoughts are creating <span>chaotic noise</span>.</h2>

            <p>
              Let&apos;s organize them.
            </p>
          </div>

          <a className="btn btnBlue" href="/contact">
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
     
    </main>
  );
}