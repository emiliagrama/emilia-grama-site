import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
      });
      return;
    }

    const id = hash.slice(1);
    if (!id) return;

    let tries = 0;
    const maxTries = 30;

    const tick = () => {
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        return;
      }

      tries += 1;
      if (tries < maxTries) {
        setTimeout(tick, 50);
      }
    };

    setTimeout(tick, 0);
  }, [pathname, hash]);

  return null;
}