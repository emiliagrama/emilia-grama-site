import { useEffect, useRef, useState } from "react";
import "../../styles/controlledChaos.css";
import ShaderPanel from "./ShaderPanel";
import WaveGridCard from "./WaveGridCard";
import DepthBloomCard from "./DepthBloomCard";

function LazyExperiment({ children, rootMargin = "150px 0px" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{ready ? children : null}</div>;
}

export default function ControlledChaos() {
  return (
    <section id="controlled-chaos" className="libSection">
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

        <LazyExperiment>
          <ShaderPanel />
        </LazyExperiment>
      </div>

      <h3 className="labExperimentTitle">
        Surface & Depth Systems
      </h3>

      <div className="libPanel">
        <p className="labExperimentDesc">
          Interactive visual experiments exploring surface distortion and depth
          fields.
        </p>

        <LazyExperiment>
          <div className="labCardsRow">
            <DepthBloomCard />
            <WaveGridCard />
          </div>
        </LazyExperiment>
      </div>
    </section>
  );
}