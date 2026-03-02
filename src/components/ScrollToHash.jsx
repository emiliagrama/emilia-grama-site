import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);
    if (!id) return;

    let tries = 0;
    const maxTries = 30; // ~30 * 50ms = 1.5s

    const tick = () => {
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      tries += 1;
      if (tries < maxTries) setTimeout(tick, 50);
    };

    // wait a bit for route paint + heavy UI
    setTimeout(tick, 0);
  }, [pathname, hash]);

  return null;
}