import DistortionCanvas from "./DistortionCanvas";
import "../../styles/distortionSection.css";

export default function DistortionSection() {
  return (
    <section className="distortion-section">
      <div className="distortion-container">
        <div className="distortion-text">
          <p className="kicker">Creative interaction</p>
          <h2>
            Motion that feels
            <br />
            alive, not artificial.
          </h2>
          <p>Subtle distortion driven by interaction, not noise.</p>
        </div>

        <div className="distortion-visual">
          <DistortionCanvas />
        </div>
      </div>
    </section>
  );
}