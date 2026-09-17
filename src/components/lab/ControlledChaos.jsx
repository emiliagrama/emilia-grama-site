import "../../styles/controlledChaos.css";
import ShaderPanel from "./ShaderPanel";
import WaveGridCard from "./WaveGridCard";
import DepthBloomCard from "./DepthBloomCard";

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

          <ShaderPanel />
        </div>
      
        <h3 className="labExperimentTitle">Surface & Depth Systems</h3>

        <div className="libPanel">
          <p className="labExperimentDesc">
            Interactive visual experiments exploring surface distortion and depth fields.
          </p>
          
          <div className="labCardsRow">
            <DepthBloomCard />
            <WaveGridCard />
          </div>
        </div>
    </section>
  );
}