import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  variant = "base",
  brand = "EMILIA GRAMA",
  links = ["UI experiments"],
  ctaLabel = "Contact",
  ctaHref = "#",
  withMenu = false,
}) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);
  const menuId = useId();

  // Normalize links
  const normalizedLinks = useMemo(() => {
    return (links || []).map((item) => {
      if (typeof item === "string") {
        const slug = item.toLowerCase().replace(/\s+/g, "-");
        return { label: item, href: `#${slug}` };
      }
      return { label: item.label, href: item.href || "#" };
    });
  }, [links]);

  const isRoute = (href) => href?.startsWith("/");

  // Close menu if clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (!rootRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handleClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("pointerdown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  const renderNavItem = (item, className, onClick) => {
    if (isRoute(item.href)) {
      return (
        <Link to={item.href} className={className} onClick={onClick}>
          {item.label}
        </Link>
      );
    }
    return (
      <a href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  };

  return (
    <div ref={rootRef} className={`navbWrap navbWrap--${variant}`}>
      <nav className={`navb navb--${variant}`}>
        <div className="navb__brand">{brand}</div>

        {!withMenu ? (
          <ul className="navb__links">
            {normalizedLinks.map((item) => (
              <li key={item.label}>
                {renderNavItem(item, "navb__link")}
              </li>
            ))}
          </ul>
        ) : (
          <div className="navb__spacer" />
        )}

        <div className="navb__actions">
          {withMenu ? (
            <button
              className={`navb__menuBtn ${open ? "is-open" : ""}`}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          ) : (
            <a
              className={`navb__cta navb__cta--${variant}`}
              href={ctaHref}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </nav>

      {/* Push-down dropdown */}
      {withMenu && (
        <div
          id={menuId}
          className={`navbDropdown ${open ? "is-open" : ""}`}
        >
          <div className="navbDropdown__inner">
            {normalizedLinks.map((item) => (
              <div key={item.label}>
                {renderNavItem(
                  item,
                  "navb__menuItem",
                  () => setOpen(false)
                )}
              </div>
            ))}

            <div className="navb__menuDivider" />

            <div>
              {renderNavItem(
                { label: ctaLabel, href: ctaHref },
                "navb__menuItem navb__menuItem--cta",
                () => setOpen(false)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}