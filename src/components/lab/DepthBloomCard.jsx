import { useEffect, useMemo, useRef } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function DepthBloomCard() {
  const cardRef = useRef(null);

const particles = useMemo(() => {
  const centerX = 62;
  const centerY = 38;

  return Array.from({ length: 54 }, (_, i) => {
    const layer = Math.random();

    // BACKGROUND
    if (layer < 0.5) {
      const x = randomBetween(8, 90);
      const y = randomBetween(8, 65);

      let driftX = randomBetween(-8, 8);
      let driftY = randomBetween(-16, -4);

      const dx = x - centerX;
      const dy = y - centerY;

      driftX += dx * 0.07;
      driftY += dy * 0.07;

      return {
        id: i,
        x,
        y,
        size: randomBetween(1, 6),
        opacity: randomBetween(0.06, 0.20),
        blur: randomBetween(2, 5),
        duration: randomBetween(7, 11),
        delay: randomBetween(0, 5),
        driftX,
        driftY,
        depth: randomBetween(10, 30),
        color: "rgba(0, 179, 255, 0.38)"
      };
    }

    // MID LAYER
    if (layer < 0.9) {
      const midColors = [
        "rgba(40, 210, 255, 0.82)",
        "rgba(120, 90, 255, 0.72)"
      ];

      const x = randomBetween(8, 60);
      const y = randomBetween(8, 65);

      let driftX = randomBetween(-5, 5);
      let driftY = randomBetween(-26, -10);

      const dx = x - centerX;
      const dy = y - centerY;

      driftX += dx * 0.09;
      driftY += dy * 0.09;

      return {
        id: i,
        x,
        y,
        size: randomBetween(2, 10),
        opacity: randomBetween(0.28, 0.62),
        blur: randomBetween(0, 2),
        duration: randomBetween(4, 8),
        delay: randomBetween(0, 4),
        driftX,
        driftY,
        depth: randomBetween(30, 60),
        color: randomItem(midColors)
      };
    }

    // FOREGROUND
    const x = randomBetween(8, 70);
    const y = randomBetween(8, 75);

    let driftX = randomBetween(-10, 10);
    let driftY = randomBetween(-22, -8);

    const dx = x - centerX;
    const dy = y - centerY;

    driftX += dx * 0.06;
    driftY += dy * 0.06;

    return {
      id: i,
      x,
      y,
      size: randomBetween(5, 12),
      opacity: randomBetween(0.82, 1),
      blur: 0,
      duration: randomBetween(3, 6),
      delay: randomBetween(0, 3),
      driftX,
      driftY,
      depth: randomBetween(60, 90),
      color: Math.random() < 0.6
  ? "rgba(40, 210, 255, 0.95)"
  : "rgba(255, 255, 255, 0.85)"
    };
  });
}, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    function handleTouchStart() {
      el.classList.add("depthBloomCard--active");
    }

    function handleTouchEnd() {
      el.classList.remove("depthBloomCard--active");
    }

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <div className="depthBloomStage">
      <article ref={cardRef} className="depthBloomCard">
        <div className="depthBloomCard__media">
          <div className="depthBloomField" aria-hidden="true">
            {particles.map((particle) => (
              <span
                key={particle.id}
                className="depthBloomParticle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  background: particle.color,
                  boxShadow: `
                    0 0 ${particle.size * 1.5}px ${particle.color},
                    0 0 ${particle.size * 5}px ${particle.color}
                    `,                  filter: `blur(${particle.blur}px)`,
                  animationDuration: `${particle.duration}s`,
                  animationDelay: `${particle.delay}s`,
                  "--drift-x": `${particle.driftX}px`,
                  "--drift-y": `${particle.driftY}px`,
                  "--depth-z": `${particle.depth}px`
                }}
              />
            ))}

            <div className="depthBloomField__vignette" />
            <div className="depthBloomField__coreGlow" />
          </div>
        </div>

        <div className="depthBloomCard__content">
          <h3>Depth Bloom</h3>
          <p>
            Layered particle field expanding from darkness with a soft forward pull.
          </p>
        </div>
      </article>
    </div>
  );
}