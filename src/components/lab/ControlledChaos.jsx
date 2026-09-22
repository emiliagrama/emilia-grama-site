import { useEffect, useRef, useState } from "react";
import "../../styles/controlledChaos.css";
import ShaderPanel from "./ShaderPanel";
import WaveGridCard from "./WaveGridCard";
import DepthBloomCard from "./DepthBloomCard";

export default function ControlledChaos() {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="controlled-chaos"
      className="libSection"
    >
      <h2>
        Controlled chaos <span className="libPulse" aria-hidden="true" />
      </h2>

      <p className="libLead">
        Controlled instability. Where structure bends.
      </p>

      <h3 className="labExperimentTitle">
        Fractal Noise
      </h3>

      <div className="libPanel">
        <p className="labExperimentDesc">
          Noise field warped by cursor interaction.
        </p>

        {shouldRender && <ShaderPanel />}
      </div>

      <h3 className="labExperimentTitle">
        Surface & Depth Systems
      </h3>

      <div className="libPanel">
        <p className="labExperimentDesc">
          Interactive visual experiments exploring surface distortion and depth fields.
        </p>

        <div className="labCardsRow">
          {shouldRender && (
            <>
                {/* <DepthBloomCard /> */}
              <WaveGridCard />
            </>
          )}
        </div>
      </div>
    </section>
  );
}