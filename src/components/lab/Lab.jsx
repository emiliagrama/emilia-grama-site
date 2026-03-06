import React from "react";
import "../../styles/lab.css";
import ShaderPanel from "./ShaderPanel";
export default function Lab() {
  return (
    <section id="lab" className="libSection">
        <h2>
          Lab <span className="libPulse" aria-hidden="true" />
        </h2>

        <p className="libLead">
          Controlled instability. Where structure bends.
        </p>
      <div className="libPanel">

        <h3 className="labExperimentTitle">
          Fractal Noise
        </h3>

        <p className="labExperimentDesc">
          Noise field warped by cursor interaction.
        </p>

        <ShaderPanel />

      </div>
    
    </section>
  );
}