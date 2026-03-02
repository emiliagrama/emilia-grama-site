import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  addDays,
  differenceInCalendarDays,
  format,
  isBefore,
  isSameDay,
  startOfDay
} from "date-fns";

import PlanSelect from "../components/PlanSelect";
import "react-day-picker/dist/style.css";
import "../styles/forms.css";

const PLAN_RULES = {
  Standard: { mode: "any" },
  ShortStay: { mode: "weekdayOnly", weekday: 1, nights: 5 },
  FullStay: { mode: "weekdayOnly", weekday: 3, nights: 10 },
  Weekend: { mode: "weekdayOnly", weekday: 5, nights: 2 }
};

const PLAN_OPTIONS = [
  { value: "Standard", label: "Standard (Flexible)" },
  { value: "ShortStay", label: "Short stay (5 nights)" },
  { value: "FullStay", label: "Full stay (10 nights)" },
  { value: "Weekend", label: "Weekend (2 nights)" }
];

const emptyRange = { from: undefined, to: undefined };

export default function Form() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [email, setEmail] = useState("");

  const [state, setState] = useState({
    name: "",
    message: "",
    plan: "Standard",
    agree: false,
    error: "",
    range: emptyRange
  });

  const rule = PLAN_RULES[state.plan] || PLAN_RULES.Standard;
  const today = startOfDay(new Date());

  const nights = useMemo(() => {
    const { from, to } = state.range || {};
    if (!from || !to) return 0;
    const diff = differenceInCalendarDays(to, from);
    return diff > 0 ? diff : 0;
  }, [state.range]);

  const rangeLabel = useMemo(() => {
    const { from, to } = state.range || {};
    if (!from && !to) return "Select check-in and check-out.";
    if (from && !to)
      return `Check-in: ${format(from, "dd MMM yyyy")} — pick a check-out date.`;
    if (from && to)
      return `${format(from, "dd MMM yyyy")} → ${format(to, "dd MMM yyyy")} (${nights} nights)`;
    return "Select dates.";
  }, [state.range, nights]);

  const showError = (msg) => setState((s) => ({ ...s, error: msg }));

  const reset = () => {
    setState({
      name: "",
      message: "",
      plan: "Standard",
      agree: false,
      error: "",
      range: emptyRange
    });
    setEmail("");
    setOpenCalendar(false);
  };

  const validate = () => {
    if (!state.name.trim()) return showError("Name is required.");
    if (!state.agree) return showError("Please accept the terms.");

    const { from, to } = state.range || {};
    if (!from || !to) return showError("Please select check-in and check-out.");
    if (!isBefore(from, to)) return showError("Check-out must be after check-in.");

    // extra guard: check-in must match the rule
    if (rule.mode === "weekdayOnly" && from.getDay() !== rule.weekday) {
      return showError("Selected check-in day is not allowed for this package.");
    }

    showError("");
  };

  // Disable dates in the calendar (past dates + weekdayOnly rule)
  const disabledByRule = (date) => {
    if (isBefore(date, today)) return true;

    // Restrict ONLY check-in day.
    // If you disable all non-weekday dates, picking "to" becomes impossible.
    // So restrict only when selecting "from" (i.e. no check-in chosen yet).
    if (rule.mode === "weekdayOnly" && !state.range?.from) {
      return date.getDay() !== rule.weekday;
    }

    return false;
  };

  // When plan changes: reset range and close calendar
  const onPlanChange = (nextPlan) => {
    setState((s) => ({
      ...s,
      plan: nextPlan,
      error: "",
      range: emptyRange
    }));
    setOpenCalendar(false);
  };

  // Range selection logic
 const onSelectRange = (range) => {
  // cleared
  if (!range?.from) {
    setState((s) => ({ ...s, range: emptyRange, error: "" }));
    return;
  }

  // FIXED-LENGTH PACKAGES:
  // DayPicker may set `to = from` on first click => treat that as "only from selected"
  if (rule.nights) {
    const from = range.from;

    // Always compute checkout from check-in (ignore range.to completely)
    const to = addDays(from, rule.nights);

    setState((s) => ({
      ...s,
      range: { from, to },
      error: ""
    }));

    setOpenCalendar(false);
    return;
  }

  // STANDARD (manual range)
  setState((s) => ({
    ...s,
    range: range || emptyRange,
    error: ""
  }));

  if (range?.from && range?.to && !isSameDay(range.from, range.to)) {
    setOpenCalendar(false);
  }
};

  const planMeta =
    rule.nights ? `${rule.nights} nights` : nights ? `${nights} nights` : "Pick dates";

  // ...rest of your component JSX below (unchanged)

  return (
    <div className="formLib">
      <div className="formLibGrid">
        {/* Left */}
        <div className="formLibPanel">
          <div className="formLibHeader">
            <div className="formLibKicker">FORM</div>
            <h3 className="formLibTitle">Primary fields</h3>
            <p className="formLibSub">
              Focus, hover, disabled, helper text. UI logic: package rules + date range.
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
                onChange={(e) => setState((s) => ({ ...s, name: e.target.value, error: "" }))}
                aria-invalid={Boolean(state.error) && !state.name.trim()}
              />
              <div className="formLibHelp">Used for greetings / personalization.</div>
            </div>

            <div className="formLibField">
              <label className="formLibLabel" id="planLabel">
                Package
              </label>

              <PlanSelect
                labelId="planLabel"
                value={state.plan}
                options={PLAN_OPTIONS}
                onChange={onPlanChange}
              />

              <div className="formLibHelp">
                Rules can restrict valid check-in days and auto-fill check-out.
              </div>
            </div>
          </div>

          {/* Date range picker */}
          <div className="formLibField">
            <label className="formLibLabel" htmlFor="dates">
              Dates (range picker)
            </label>

            <button
              type="button"
              id="dates"
              className="formLibDateTrigger"
              onClick={() => setOpenCalendar((v) => !v)}
              aria-expanded={openCalendar}
              aria-controls="formLibCalendar"
            >
              <span className="formLibDateValue">
                {state.range?.from ? format(state.range.from, "dd MMM yyyy") : "Check-in"}
                <span className="formLibDateArrow">→</span>
                {state.range?.to ? format(state.range.to, "dd MMM yyyy") : "Check-out"}
              </span>

              <span className="formLibDateMeta">{planMeta}</span>
            </button>

            <div className="formLibHelp">{rangeLabel}</div>

            {openCalendar && (
              <div className="formLibCalendarWrap" id="formLibCalendar">
                <DayPicker
                  mode="range"
                  numberOfMonths={2}
                  selected={state.range}
                  disabled={disabledByRule}
                  onSelect={onSelectRange}
                />

                <div className="formLibCalendarActions">
                  <button
                    type="button"
                    className="formLibBtn formLibBtn--ghost"
                    onClick={() =>
                      setState((s) => ({
                        ...s,
                        range: emptyRange,
                        error: ""
                      }))
                    }
                  >
                    Clear dates
                  </button>

                  <button
                    type="button"
                    className="formLibBtn formLibBtn--primary"
                    onClick={() => setOpenCalendar(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
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
              onChange={(e) => setState((s) => ({ ...s, message: e.target.value, error: "" }))}
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
              <button type="button" className="formLibBtn formLibBtn--ghost" onClick={reset}>
                Reset
              </button>

              <button type="button" className="formLibBtn formLibBtn--primary" onClick={validate}>
                Validate
              </button>
            </div>
          </div>

          {state.error ? <div className="formLibError">{state.error}</div> : null}
        </div>

        {/* Right */}
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
            <input className="formLibInput formLibInput--error" placeholder="Invalid…" aria-invalid="true" />
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