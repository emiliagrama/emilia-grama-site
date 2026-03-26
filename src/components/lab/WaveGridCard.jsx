import { useRef } from "react";
import WaveGridPanel from "./WaveGridPanel";

export default function WaveGridCard() {
  const cardRef = useRef(null);

  function handleMove(e) {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 18;
    const rotateX = (0.5 - py) * 18;

    const glareX = px * 100;
    const glareY = py * 100;

    el.style.setProperty("--rotateX", `${rotateX}deg`);
    el.style.setProperty("--rotateY", `${rotateY}deg`);
    el.style.setProperty("--glareX", `${glareX}%`);
    el.style.setProperty("--glareY", `${glareY}%`);
    el.style.setProperty("--lift", `-8px`);
  }

  function handleLeave() {
    const el = cardRef.current;
    if (!el) return;

    el.style.setProperty("--rotateX", `0deg`);
    el.style.setProperty("--rotateY", `0deg`);
    el.style.setProperty("--glareX", `50%`);
    el.style.setProperty("--glareY", `0%`);
    el.style.setProperty("--lift", `8px`);
  }

  return (
    <div className="waveCardStage">
      <div
        ref={cardRef}
        className="waveCard"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="waveCard__media">
          <WaveGridPanel />
        </div>

        <div className="waveCard__content">
          <h3>Wave Grid</h3>
          <p>
            Distorted monochrome field with living motion and responsive light.
          </p>
        </div>
      </div>
    </div>
  );
}