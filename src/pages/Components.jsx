import Button from "../components/Button";
import Card from "../components/Card";

const SECTIONS = [
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Form fields" },
  { id: "nav", label: "Navbars" },
  { id: "hover", label: "Hover effects" },
  { id: "animations", label: "Animations" },
  { id: "player", label: "Players" },
];

export default function Components() {
  return (
    <main className="libPage">
      <div className="libShell">
        <aside className="libSidebar">
          <h1 className="libTitle">Component Library</h1>
          <p className="libSubtitle">Showcase of reusable UI parts used across the site.</p>

          <nav className="libNav">
            {SECTIONS.map(s => (
              <a key={s.id} className="libNav__link" href={`#${s.id}`}>
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <section className="libContent">
          <div className="libSection" id="buttons">
            <header className="libSection__header">
              <h2>Buttons
              <span className="libPulse" aria-hidden="true" />
              </h2>
              <p>All button styles, sizes, and states.</p>
            </header>

            <div className="libPanel">
              <p className="libGroupLabel">Styles</p>
              <div className="libRow">
                <Button variant="neon">Neon</Button>
                <Button variant="outline"className="uiBtn--ring">Outline</Button>
                <Button variant="gold">Gold</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="pulse" className="uiBtn--pulse">Pulse</Button>
              </div> 

                <p className="libGroupLabel">Media</p>
              <div className="libRow">
                <Button variant="media" bgImage="/images/universe/leopard.png">
                  Patterns
                </Button>
                <Button variant="media" bgImage="/images/universe/intent-fill.jpg" bgPosition="50% 60%">
                  Parallax Texture
                </Button>
              </div>
                <p className="libGroupLabel">Shapes</p>
              <div className="libRow" style={{ marginTop: 16 }}>
                <Button shape="soft">Soft</Button>
                <Button shape="square">Square</Button>
                <Button shape="cut">Cut</Button>
                <Button shape="hex">Hex</Button>
              </div>

            </div>
          </div>

          <div className="libSection" id="cards">
            <header className="libSection__header">
              <h2>Cards
              <span className="libPulse" aria-hidden="true" />
              </h2>
              <p>Layouts, media cards, hover states, and a flip interaction.</p>
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
                  Perfect for services, project previews, or feature highlights.
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

              <p className="libGroupLabel" style={{ marginTop: 18 }}>Media</p>
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
          <div className="libSection" id="forms"><header className="libSection__header"><h2>Form fields<span className="libPulse" aria-hidden="true" /> </h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="nav"><header className="libSection__header"><h2>Navbars <span className="libPulse" aria-hidden="true" /></h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="hover"><header className="libSection__header"><h2>Hover effects <span className="libPulse" aria-hidden="true" /> </h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="animations"><header className="libSection__header"><h2>Animations <span className="libPulse" aria-hidden="true" /></h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="player"><header className="libSection__header"><h2>Players <span className="libPulse" aria-hidden="true" /></h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
        </section>
      </div>
    </main>
  );
}
