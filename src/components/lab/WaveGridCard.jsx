import { useRef } from "react";
import WaveGridPanel from "./WaveGridPanel";

export default function WaveGridCard() {
  const cardRef = useRef(null);

  function updateTilt(clientX, clientY) {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 13;
    const rotateX = (0.5 - py) * 13;

    const glareX = px * 100;
    const glareY = py * 100;

    el.style.setProperty("--rotateX", `${rotateX}deg`);
    el.style.setProperty("--rotateY", `${rotateY}deg`);
    el.style.setProperty("--glareX", `${glareX}%`);
    el.style.setProperty("--glareY", `${glareY}%`);
    el.style.setProperty("--lift", `-12px`);
  }

  function resetTilt() {
    const el = cardRef.current;
    if (!el) return;

    el.style.setProperty("--rotateX", `0deg`);
    el.style.setProperty("--rotateY", `0deg`);
    el.style.setProperty("--glareX", `50%`);
    el.style.setProperty("--glareY", `0%`);
    el.style.setProperty("--lift", `0px`);
  }

  function handleMove(e) {
    updateTilt(e.clientX, e.clientY);
  }

  function handleTouchStart(e) {
    const touch = e.touches[0];
    if (!touch) return;
    updateTilt(touch.clientX, touch.clientY);
  }

  function handleTouchMove(e) {
    const touch = e.touches[0];
    if (!touch) return;
    updateTilt(touch.clientX, touch.clientY);
  }

  function handleLeave() {
    resetTilt();
  }

  function handleTouchEnd() {
    resetTilt();
  }

  return (
    <div className="waveCardStage">
      <div
        ref={cardRef}
        className="waveCard"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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