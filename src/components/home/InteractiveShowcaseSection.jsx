import { useEffect, useRef, useState } from "react";
import DistortionCanvas from "./DistortionCanvas";
import GlassBreakCanvas from "./GlassBreakCanvas";
import "../../styles/interactiveShowcaseSection.css";

export default function InteractiveShowcaseSection() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height - viewportHeight;
      const traveled = Math.min(Math.max(-rect.top, 0), total);
      const nextProgress = total > 0 ? traveled / total : 0;

      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const distortionOpacity = Math.max(1 - progress * 2.2, 0);
  const glassOpacity = Math.min(Math.max((progress - 0.35) * 2.4, 0), 1);

  const distortionScale = 1 - progress * 0.04;
  const glassScale = 0.96 + glassOpacity * 0.04;

  return (
    <section ref={sectionRef} className="interactive-showcase-section">
      <div className="interactive-showcase-sticky">
        <div className="interactive-showcase-inner">
          <div className="interactive-showcase-copy">
            <span className="interactive-showcase-eyebrow">
              Creative interaction
            </span>

            <h2>
              Distortion that feels alive,
              <br />
              not artificial.
            </h2>

            <p className="interactive-showcase-hint">
            Move to disturb. Click to fracture.
            </p>
      
          </div>

          <div className="interactive-showcase-stage">
            <div
              className="stage-layer stage-layer--distortion"
              style={{
                opacity: distortionOpacity,
                transform: `scale(${distortionScale})`,
                pointerEvents: distortionOpacity > 0.1 ? "auto" : "none",
              }}
            >
              <DistortionCanvas isActive={true} />
            </div>

            <div
              className="stage-layer stage-layer--glass"
              style={{
                opacity: glassOpacity,
                transform: `scale(${glassScale})`,
                pointerEvents: glassOpacity > 0.5 ? "auto" : "none",
              }}
            >
              <GlassBreakCanvas isActive={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}