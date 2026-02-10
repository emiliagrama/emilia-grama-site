// src/components/Form.jsx
import React, { useState } from "react";
import "../styles/forms.css";

export default function Form() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({
    name: "",
    message: "",
    plan: "Standard",
    agree: false,
    disabled: false,
    error: "",
  });

  const showError = (msg) => setState((s) => ({ ...s, error: msg }));

  return (
    <div className="formLib">
      <div className="formLibGrid">
        {/* Left: normal fields */}
        <div className="formLibPanel">
          <div className="formLibHeader">
            <div className="formLibKicker">FORM</div>
            <h3 className="formLibTitle">Primary fields</h3>
            <p className="formLibSub">
              Focus, hover, disabled, helper text. No submission logic — UI only.
            </p>
          </div>

          <div className="formLibRow2">
            <div className="formLibField">
              <label className="formLibLabel" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="formLibInput"
                type="text"
                placeholder="Emilia Grama"
                value={state.name}
                onChange={(e) =>
                  setState((s) => ({ ...s, name: e.target.value, error: "" }))
                }
              />
              <div className="formLibHelp">Used for greetings / personalization.</div>
            </div>

            <div className="formLibField">
              <label className="formLibLabel" htmlFor="plan">
                Package
              </label>
              <select
                id="plan"
                className="formLibSelect"
                value={state.plan}
                onChange={(e) =>
                  setState((s) => ({ ...s, plan: e.target.value, error: "" }))
                }
              >
                <option>Standard</option>
                <option>Premium</option>
                <option>Enterprise</option>
              </select>
              <div className="formLibHelp">Select styling + dropdown arrow.</div>
            </div>
          </div>

          <div className="formLibField">
            <label className="formLibLabel" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className="formLibTextarea"
              placeholder="Write a short message…"
              value={state.message}
              onChange={(e) =>
                setState((s) => ({ ...s, message: e.target.value, error: "" }))
              }
              rows={4}
            />
            <div className="formLibHelp">Textarea + resize control (optional).</div>
          </div>

          <div className="formLibRow">
           <label className="formLibCheck">
  <input
    type="checkbox"
    checked={state.agree}
    onChange={(e) => setState((s) => ({ ...s, agree: e.target.checked, error: "" }))}
  />
  <span className="formLibCheckBox" aria-hidden="true" />
  <span>I agree to the terms</span>
</label>


            <div className="formLibActions">
              <button
                type="button"
                className="formLibBtn formLibBtn--ghost"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    name: "",
                    message: "",
                    plan: "Standard",
                    agree: false,
                    error: "",
                  }))
                }
              >
                Reset
              </button>

              <button
                type="button"
                className="formLibBtn formLibBtn--primary"
                onClick={() => {
                  if (!state.name.trim()) return showError("Name is required.");
                  if (!state.agree) return showError("Please accept the terms.");
                  showError("");
                }}
              >
                Validate
              </button>
            </div>
          </div>

          {state.error ? <div className="formLibError">{state.error}</div> : null}
        </div>

        {/* Right: “states” showcase */}
        <div className="formLibPanel formLibPanel--states">
          <div className="formLibHeader">
            <div className="formLibKicker">STATES</div>
            <h3 className="formLibTitle">Variants</h3>
            <p className="formLibSub">Same sizing, consistent rhythm.</p>
          </div>

          <div className="formLibField">
            <label className="formLibLabel">Default</label>
            <input className="formLibInput" placeholder="Default input" />
          </div>

          <div className="formLibField">
            <label className="formLibLabel">Filled</label>
            <input className="formLibInput" value="Filled value" readOnly />
            <div className="formLibHelp">Read-only style should still look premium.</div>
          </div>

          <div className="formLibField">
            <label className="formLibLabel">Error</label>
            <input className="formLibInput formLibInput--error" placeholder="Invalid…" />
            <div className="formLibHelp formLibHelp--error">Example error helper text.</div>
          </div>

          <div className="formLibField">
            <label className="formLibLabel">Disabled</label>
            <input className="formLibInput" placeholder="Disabled…" disabled />
          </div>

          <div className="formLibDivider" />

          <div className="formLibField">
            <label className="formLibLabel">Email (micro validation)</label>
            <input
              className="formLibInput"
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="formLibHelp">
              {email.includes("@") ? "Looks valid." : "Type an @ to see helper change."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
