import { useEffect, useRef } from "react";

const componentCards = [
  { img: "/images/universe/clicktofracture.png", title: "Fracture", alt: "Click to fracture" },
  { img: "/images/universe/cards.jpg", title: "Cards", alt: "Card experiments" },
  { img: "/images/universe/form.jpg", title: "Form System", alt: "Form experiments" },
  { img: "/images/universe/lesnoise.png", title: "LesNoise", alt: "LesNoise website review tool" },
  { img: "/images/universe/player.jpg", title: " Audio Player", alt: "Custom audio player" },
  { img: "/images/universe/lab.jpg", title: "Fractal Noise", alt: "Fractal noise shader experiment" },
  { img: "/images/universe/breaktherules.png", title: "Voltage Button", alt: "Animated voltage button interaction" },
];

export default function InfiniteCarousel() {
  const experimentsScrollRef = useRef(null);
  const experimentsTrackRef = useRef(null);
  const experimentsSetRef = useRef(null);

  const rafId = useRef(null);
  const offsetPx = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const scrollEl = experimentsScrollRef.current;
    const trackEl = experimentsTrackRef.current;
    const setEl = experimentsSetRef.current;

    if (!scrollEl || !trackEl || !setEl) return;


    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    const speed = 40;
    let distance = Math.max(
      1,
      Math.round(setEl.getBoundingClientRect().width)
    );

    let last = performance.now();

    const onEnter = () => {
      pausedRef.current = true;
    };

    const onLeave = () => {
      pausedRef.current = false;
      last = performance.now();
    };

    const canHover = window.matchMedia("(hover: hover)").matches;

    if (canHover) {
      scrollEl.addEventListener("mouseenter", onEnter);
      scrollEl.addEventListener("mouseleave", onLeave);
    }

    const setDistanceSafely = () => {
      distance = Math.max(
        1,
        Math.round(setEl.getBoundingClientRect().width)
      );

      offsetPx.current = offsetPx.current % distance;
    };

    const ro = new ResizeObserver(() =>
      requestAnimationFrame(setDistanceSafely)
    );

    ro.observe(setEl);

    const tick = (t) => {
      const dt = t - last;
      last = t;

      if (!pausedRef.current) {
        offsetPx.current += (speed * dt) / 1000;

        if (offsetPx.current >= distance) {
          offsetPx.current -= distance;
        }

        trackEl.style.transform =
          `translate3d(${-Math.round(offsetPx.current)}px, 0, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

ro.disconnect();

if (canHover) {
  scrollEl.removeEventListener("mouseenter", onEnter);
  scrollEl.removeEventListener("mouseleave", onLeave);
}
    };
  }, []);

    return (
    <div
      ref={experimentsScrollRef}
      className="experimentsScroll"
      aria-label="Infinite carousel"
    >
      <div ref={experimentsTrackRef} className="experimentsTrack">

        <div ref={experimentsSetRef} className="experimentsSet">
          {componentCards.map((c) => (
            <article className="componentCard" key={c.title}>
              <div className="componentPreview">
                <img
                  src={c.img}
                  alt={c.alt}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="componentCardContent">
                <h3>{c.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="experimentsSet" aria-hidden="true">
          {componentCards.map((c, idx) => (
            <article
              className="componentCard"
              key={`${c.title}-dup-${idx}`}
              aria-hidden="true"
            >
              <div className="componentPreview">
                <img
                  src={c.img}
                  alt=""
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div className="componentCardContent">
                <h3>{c.title}</h3>
              </div>
            </article>
          ))}
        </div>

      </div>

      <div className="experimentsFog" aria-hidden="true" />
    </div>
  );
}