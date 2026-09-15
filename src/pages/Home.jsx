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
            <a className="btn" href="/experiments" style={{ border: "1px solid rgba(255, 255, 255, 0.03)" }}>
              UI experiments
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
                  Real-time website review tool for developers and clients.No more screenshots.
                </p>

                <p className="projectDesc2">
                  Built for faster reviews, clearer communication, and fewer revision cycles during website projects.
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

           {/* ================= INTERACTIVE SHOWCASE ================= */}
      <InteractiveShowcaseSection />

      

    </main>
  );
}