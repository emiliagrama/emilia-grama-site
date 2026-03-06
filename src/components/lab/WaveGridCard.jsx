import { useRef, useState } from "react";
import WaveGridPanel from "./WaveGridPanel";

export default function WaveGridCard() {
  const cardRef = useRef(null);

  const [cardStyle, setCardStyle] = useState({
    transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)"
  });

  const [mediaStyle, setMediaStyle] = useState({
    transform: "translate3d(0px, 0px, 30px) scale(1.04)"
  });

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;

    const shiftX = (0.5 - px) * 10;
    const shiftY = (0.5 - py) * 10;

    setCardStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
    });

    setMediaStyle({
      transform: `translate3d(${shiftX}px, ${shiftY}px, 30px) scale(1.05)`
    });
  };

  const handleLeave = () => {
    setCardStyle({
      transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)"
    });

    setMediaStyle({
      transform: "translate3d(0px, 0px, 30px) scale(1.04)"
    });
  };

  return (
    <div className="waveGridCardWrap">
      <div className="waveGridCardShadow" aria-hidden="true" />

      <article
        ref={cardRef}
        className="waveGridCard"
        style={cardStyle}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="waveGridCard__inner">
          <div className="waveGridCard__media" style={mediaStyle}>
            <WaveGridPanel />
          </div>

          <div className="waveGridCard__meta">
            <span className="waveGridCard__title">Wave Grid</span>
          </div>
        </div>
      </article>
    </div>
  );
}