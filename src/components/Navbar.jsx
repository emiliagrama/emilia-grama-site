import { useEffect, useRef, useState } from "react";

export default function Navbar({
  variant = "base",
  brand = "EMILIA GRAMA",
  links = ["UI experiments", "Email me"],
  ctaLabel = "Contact",
  withMenu = false, // ✅ new
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e) => {
  if (menuRef.current && !menuRef.current.contains(e.target)) {
    setOpen(false);
  }
};


    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <nav className={`navb navb--${variant}`}>
      <div className="navb__brand">{brand}</div>

      {/* ✅ If withMenu, hide center links and show menu button */}
      {!withMenu ? (
        <ul className="navb__links">
          {links.map((label) => (
            <li key={label} className="navb__link">
              {label}
            </li>
          ))}
        </ul>
      ) : (
        <div className="navb__spacer" />
      )}

      <div className="navb__actions" ref={menuRef}>
        {withMenu ? (
          <>
            <button
              className={`navb__menuBtn ${open ? "is-open" : ""}`}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>

            {open && (
              <div className="navb__menu">
                {links.map((label) => (
                  <button
                    key={label}
                    className="navb__menuItem"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </button>
                ))}
                <div className="navb__menuDivider" />
                <button className="navb__menuItem navb__menuItem--cta" type="button">
                  {ctaLabel}
                </button>
              </div>
            )}
          </>
        ) : (
          <button className={`navb__cta navb__cta--${variant}`} type="button">
            {ctaLabel}
          </button>
        )}
      </div>
    </nav>
  );
}
