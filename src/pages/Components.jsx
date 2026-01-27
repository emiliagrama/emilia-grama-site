import Button from "../components/Button";

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
              <h2>Buttons</h2>
              <p>All button styles, sizes, and states.</p>
            </header>

            <div className="libPanel">
              <p className="libGroupLabel">Styles</p>
              <div className="libRow">
                <Button variant="glass">Glass</Button>
                <Button variant="neon">Neon</Button>
                <Button variant="gold">Gold</Button>
                <Button variant="flat">Flat</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>  
                <p className="libGroupLabel">Media</p>
              <div className="libRow">
                <Button variant="media" bgImage="/images/universe/tiger.jpg"
                >
                  White Tiger
                </Button>
                <Button variant="media" bgImage="/images/universe/hero-wave.jpg" bgPosition="50% 60%">
                  Parallax Texture
                </Button>
              </div>
                <p className="libGroupLabel">Shapes</p>
              <div className="libRow" style={{ marginTop: 16 }}>
                <Button shape="pill">Pill</Button>
                <Button shape="soft">Soft</Button>
                <Button shape="square">Square</Button>
                <Button shape="cut">Cut</Button>
                <Button shape="hex">Hex</Button>
              </div>

            </div>
          </div>

          {/* placeholders */}
          <div className="libSection" id="cards"><header className="libSection__header"><h2>Cards</h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="forms"><header className="libSection__header"><h2>Form fields</h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="nav"><header className="libSection__header"><h2>Navbars</h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="hover"><header className="libSection__header"><h2>Hover effects</h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="animations"><header className="libSection__header"><h2>Animations</h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
          <div className="libSection" id="player"><header className="libSection__header"><h2>Players</h2><p>Coming next.</p></header><div className="libPanel libPanel--placeholder">—</div></div>
        </section>
      </div>
    </main>
  );
}
