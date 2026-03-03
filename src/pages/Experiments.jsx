import { useEffect, useMemo } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import HugoPlayer from "../components/HugoPlayer";
import Lab from "../components/Lab";

const SECTIONS = [
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Form fields" },
  { id: "nav", label: "Navbars" },
  { id: "player", label: "Players" },
];

const LAB_SECTIONS = [{ id: "lab", label: "Controlled chaos" }];

export default function Experiments() {
  const ids = useMemo(
    () => [...SECTIONS, ...LAB_SECTIONS].map((s) => s.id),
    []
  );

  useEffect(() => {
    const setActive = (id) => {
      document.querySelectorAll(".libNav__link").forEach((el) => {
        el.classList.remove("is-active");
      });
      document
        .querySelector(`.libNav a[href="#${id}"]`)
        ?.classList.add("is-active");
    };

    const getActive = () => {
      const marker = window.innerHeight * 0.35; // "reading line"
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= marker) current = id;
      }
      return current;
    };

    const onScroll = () => setActive(getActive());

    // initial
    const initial = window.location.hash?.replace("#", "");
    if (initial && ids.includes(initial)) setActive(initial);
    else onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);

    // late reflow (player/font/media)
    const t = setTimeout(onScroll, 80);

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, [ids]);

  return (
    <main className="libPage">
      <div className="libShell">
        <aside className="libSidebar" id="experiments-menu">
          <nav className="libNav">
            <p className="libNavLabel uiLabel">System</p>

            {SECTIONS.map((s) => (
              <a key={s.id} className="libNav__link" href={`#${s.id}`}>
                {s.label}
              </a>
            ))}

            <div className="libNavDivider" />

            <p className="libNavLabel uiLabel ">Lab</p>

            {LAB_SECTIONS.map((s) => (
              <a
                key={s.id}
                className="libNav__link libNav__link--lab"
                href={`#${s.id}`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <section className="libContent" id="top">
          <header className="expIntro">
            <div className="expIntro__kicker uiLabel">UI SYSTEM + LAB</div>
            <h2 className="expIntro__title">
              Controlled structure.{" "}
              <span className="expIntro__edge">Unstable edge.</span>
            </h2>
            <p className="expIntro__lead">
              A reusable UI system in React — extended with experimental motion and interaction.
            </p>
          </header>

          {/* Buttons */}
          <div className="libSection" id="buttons">
            <header className="libSection__header">
              <h2>
                Buttons <span className="libPulse" aria-hidden="true" />
              </h2>
              <p>Button styles, sizes, and states.</p>
            </header>

            <div className="libPanel">
              <p className="libGroupLabel">Styles</p>
              <div className="libRow">
                <Button variant="neon">Neon</Button>
                <Button variant="gold">Gold</Button>
                <Button variant="outline" className="uiBtn--ring">
                  Outline
                </Button>
                <Button variant="ghost">Ghost</Button>
              </div>

              <p className="libGroupLabel">Shapes</p>
              <div className="libRow">
                <Button shape="soft">Soft</Button>
                <Button shape="square">Square</Button>
                <Button shape="cut">Cut</Button>
                <Button shape="hex">Hex</Button>
              </div>

              <p className="libGroupLabel__lab">Lab</p>
              <div className="libRow">
                <Button variant="media" bgImage="/images/universe/leopard.png">
                  Noise Pattern
                </Button>
                <Button
                  variant="media"
                  bgImage="/images/universe/intent-fill.jpg"
                  bgPosition="50% 60%">
                  Parallax Texture
                </Button>
                <Button variant="pulse" className="uiBtn--pulse">
                  Pulse Motion
                </Button>

              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="libSection" id="cards">
            <header className="libSection__header">
              <h2>
                Cards <span className="libPulse" aria-hidden="true" />
              </h2>
              <p>Layouts, media cards, hover states, and flip.</p>
            </header>

            <div className="libPanel">
              <p className="libGroupLabel">Styles</p>

              <div className="cardsGrid">
                <Card
                  variant="default"
                  eyebrow="Default"
                  title="Project card"
                  subtitle="Clean structure with CTA + hover lift."
                  href="#"
                  ctaLabel="Open"
                >
                  Designed for services, previews, and feature highlights.
                </Card>

                <Card
                  variant="glass"
                  eyebrow="Glass"
                  title="Frosted panel"
                  subtitle="Soft blur, subtle border, premium feel."
                  href="#"
                  ctaLabel="Explore"
                >
                  Great for testimonials, metrics, or secondary content blocks.
                </Card>

                <Card
                  variant="glow"
                  eyebrow="Glow"
                  title="Featured card"
                  subtitle="Controlled neon aura (still classy)."
                  href="#"
                  ctaLabel="See more"
                >
                  Use this sparingly to highlight one key item.
                </Card>
              </div>

              <p className="libGroupLabel" style={{ marginTop: 18 }}>
                Media
              </p>

              <div className="cardsGrid">
                <Card
                  variant="media"
                  eyebrow="Media"
                  title="Universe card"
                  subtitle="Video header + overlay text."
                  video="/images/universe/homepage-bg.mp4"
                  href="#"
                  ctaLabel="Visit"
                >
                  Perfect for “worlds”, galleries, and visual portfolio items.
                </Card>

                <Card
                  variant="media_img"
                  eyebrow="Media"
                  title="Parallax texture"
                  subtitle="Works with any image you drop in."
                  image="/images/universe/intent-fill.jpg"
                  href="#"
                  ctaLabel="Open"
                >
                  This gives you instant personality without heavy design work.
                </Card>

                <Card
                  variant="flip"
                  eyebrow="Flip"
                  title="Reveal on hover"
                  subtitle="Front → back in 3D."
                  image="/images/universe/tiger.jpg"
                  href="#"
                  ctaLabel="Details"
                >
                  Back side can hold extra info, tags, or a mini CTA area.
                </Card>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="libSection" id="forms">
            <header className="libSection__header">
              <h2>
                Form fields <span className="libPulse" aria-hidden="true" />
              </h2>
              <p>Inputs, states, validation, and structured interaction.</p>
            </header>

            <div className="libPanel">
              <Form />
            </div>
          </div>

          {/* Nav */}
          <div className="libSection" id="nav">
            <header className="libSection__header">
              <h2>
                Navbars <span className="libPulse" aria-hidden="true" />
              </h2>
              <p>Variants of a reusable component.</p>
            </header>

            <div className="navContainer">
              <div className="navDemoStack">
                <div className="demoRow">
                  <span className="demoTag">Base</span>
                  <Navbar
                    variant="base"
                    brand="EMILIA GRAMA"
                      links={[
                        { label: "Work", href: "/#projects" },
                        { label: "Experiments", href: "/experiments#top" },
                      ]}
                    ctaLabel="Contact"
                    ctaHref="mailto:emiliagrama@gmail.com?subject=Project%20Inquiry"            
                 />
                </div>

                <div className="demoRow">
                  <span className="demoTag">Transparent</span>
                  <Navbar
                    variant="transparent"
                    brand="EMILIA / LAB"
                     links={[
                        { label: "Experiments", href: "/experiments#top" },
                        { label: "Lab", href: "/experiments#lab" },
                      ]}
                    ctaLabel="Let's talk"
                    ctaHref="mailto:emiliagrama@gmail.com?subject=Project%20Inquiry"
                  />
                </div>

                <div className="demoRow demoRow--menu">
                  <span className="demoTag">Minimal (menu)</span>
                  <Navbar
                    variant="minimal"
                    withMenu
                    brand="EG"
                      links={[
                        { label: "Lab", href: "/experiments#lab" },
                        { label: "Work", href: "/#projects" },
                      ]}
                    ctaLabel="Send email"
                    ctaHref="mailto:emiliagrama@gmail.com?subject=Project%20Inquiry"
                  />
                </div>
                <div className="demoRow demoRow--menu">
                  <span className="demoTag">Lab</span>
                  <Navbar
                  variant="lab"
                  withMenu
                  brand="EG"
                    links={[
                      { label: "Lab", href: "/experiments#lab" },
                      { label: "Work", href: "/#projects" },
                    ]}
                  ctaLabel="Send email"
                  ctaHref="mailto:emiliagrama@gmail.com?subject=Project%20Inquiry"
                /></div>
              </div>
            </div>
          </div>

          {/* Player */}
          <div className="libSection" id="player">
            <header className="libSection__header">
              <h2>
                Players <span className="libPulse" aria-hidden="true" />
              </h2>
              <p>WaveSurfer UI player.</p>
            </header>

            <div className="libPanel libPlayerDemo">
              <HugoPlayer />

              <p className="libFinePrint">
                Original score by{" "}
                <a
                  href="https://www.hugofigueramusic.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="libInlineLink"
                >
                  Hugo Figuera ↗
                </a>
              </p>

              <h4>
                Custom audio player built with React and WaveSurfer.js, featuring waveform-based progress, grouped playlists, and responsive playback controls. Designed to demonstrate advanced UI composition and interactive audio integration in a modern frontend architecture.
              </h4>
            </div>
          </div>

          {/* Lab */}
          <Lab />
        </section>
      </div>

      <a
        href="#experiments-menu"
        className="mobileToMenu"
        aria-label="Back to experiments menu"
      >
        ↑
      </a>
    </main>
  );
}