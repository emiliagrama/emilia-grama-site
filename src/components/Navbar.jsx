import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar({
  variant = "base",
  brand = "EMILIA GRAMA",
  links = ["UI experiments"],
  ctaLabel = "Contact",
  ctaHref = "#",     // neutral default
  withMenu = false,
}) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);
  const btnRef = useRef(null);

  const menuId = useId();

  // Accept both shapes:
  // - ["Work", "About"]
  // - [{ label: "Work", href: "#work" }, ...]
  const normalizedLinks = useMemo(() => {
    return (links || []).map((item) => {
      if (typeof item === "string") {
        // safe fallback href for demos
        const slug = item.toLowerCase().replace(/\s+/g, "-");
        return { label: item, href: `#${slug}` };
      }
      return { label: item.label, href: item.href || "#" };
    });
  }, [links]);
  const isRoute = (href) => href?.startsWith("/");

  // If menu mode is turned off, ensure dropdown is closed.
  useEffect(() => {
    if (!withMenu && open) setOpen(false);
  }, [withMenu, open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      const root = rootRef.current;
      if (!root) return;

      // If click is outside the whole navbar, close.
      if (!root.contains(e.target)) setOpen(false);
    };

    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav ref={rootRef} className={`navb navb--${variant}`}>
      <div className="navb__brand">{brand}</div>

      {!withMenu ? (
        <ul className="navb__links" aria-label="Primary">
          {normalizedLinks.map((l) => (
            <li key={l.label}>
              {isRoute(l.href) ? (
                <Link className="navb__link" to={l.href}>
                  {l.label}
                </Link>
              ) : (
                <a className="navb__link" href={l.href}>
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="navb__spacer" />
      )}

      <div className="navb__actions">
        {withMenu ? (
          <>
            <button
              ref={btnRef}
              className={`navb__menuBtn ${open ? "is-open" : ""}`}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>

            <div
              id={menuId}
              className={`navb__menu ${open ? "is-open" : ""}`}
              // keep it in DOM so you can animate with CSS
              style={{ display: open ? undefined : "none" }}
            >
              {normalizedLinks.map((l) => (
                <a
                  key={l.label}
                  className="navb__menuItem"
                  href={l.href}
                  onClick={closeMenu}
                >
                  {l.label}
                </a>
              ))}

              <div className="navb__menuDivider" />

              <a
                className="navb__menuItem navb__menuItem--cta"
                href={ctaHref}
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </a>
            </div>
          </>
        ) : (
          <a className={`navb__cta navb__cta--${variant}`} href={ctaHref}>
            {ctaLabel}
          </a>
        )}
      </div>
    </nav>
  );
}