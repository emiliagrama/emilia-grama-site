import { useEffect, useRef, useState } from "react";
import "../../styles/controlledChaos.css";
import ShaderPanel from "./ShaderPanel";
import WaveGridCard from "./WaveGridCard";
import DepthBloomCard from "./DepthBloomCard";

export default function ControlledChaos() {
  const shaderRef = useRef(null);
  const cardsRef = useRef(null);

  const [showShader, setShowShader] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const shader = shaderRef.current;
    const cards = cardsRef.current;

    if (!shader || !cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === shader) {
            setShowShader(true);
          }

          if (entry.target === cards) {
            setShowCards(true);
          }
        });
      },
      {
        rootMargin: "100px 0px",
        threshold: 0,
      }
    );

    observer.observe(shader);
    observer.observe(cards);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="controlled-chaos"
      className="libSection"
    >
      <h2>
        Controlled chaos{" "}
        <span className="libPulse" aria-hidden="true" />
      </h2>

      <p className="libLead">
        Controlled instability. Where structure bends.
      </p>

      <div ref={shaderRef}>
        <h3 className="labExperimentTitle">
          Fractal Noise
        </h3>

        <div className="libPanel">
          <p className="labExperimentDesc">
            Noise field warped by cursor interaction.
          </p>

          {showShader && <ShaderPanel />}
        </div>
      </div>

      <div ref={cardsRef}>
        <h3 className="labExperimentTitle">
          Surface & Depth Systems
        </h3>

        <div className="libPanel">
          <p className="labExperimentDesc">
            Interactive visual experiments exploring surface
            distortion and depth fields.
          </p>

          <div className="labCardsRow">
            {showCards && (
              <>
                <DepthBloomCard />
                <WaveGridCard />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}