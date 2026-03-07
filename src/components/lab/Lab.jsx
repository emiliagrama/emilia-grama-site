
import "../../styles/lab.css";
import ShaderPanel from "./ShaderPanel";
import WaveGridCard from "./WaveGridCard";


export default function Lab() {
  return (
    <section id="lab" className="libSection">
        <h2>
          Lab <span className="libPulse" aria-hidden="true" />
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

          <ShaderPanel />
        </div>
      
        <h3 className="labExperimentTitle">Wave Grid</h3>
        <div className="libPanel">
          <p className="labExperimentDesc">
            Distorted checker surface presented as a floating motion card.
          </p>
          <WaveGridCard />
          
        </div>
    </section>
  );
}