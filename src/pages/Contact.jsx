import { useState } from "react";
import "../styles/contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    website: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate(values) {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Please write a message.";
    } else if (values.message.trim().length < 12) {
      nextErrors.message = "Your message is too short.";
    }

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));

    setServerError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setServerError("");

    const validationErrors = validate(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

try {
  setIsSending(true);

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      projectType: form.projectType,
      message: form.message,
      website: form.website
    })
  });

  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.error || "Failed to send message.");
  }

  setSubmitted(true);
  setForm({
    name: "",
    email: "",
    projectType: "",
    message: "",
    website: ""
  });
  setErrors({});
} catch (error) {
  setServerError(error.message || "Failed to send message.");
} finally {
  setIsSending(false);
}
  }

  return (
    <main className="contactPage">
      <section className="contactHero">
        <div className="contactHero__inner">
          <p className="contactEyebrow">CONTACT</p>
          <h1>Let’s build something strong, clear, and well designed.</h1>
          <p className="contactIntro">
            I build modern websites and web applications with a strong focus on
            structure, visual quality, and user experience. Send me a message
            with your idea, timeline, or project goals.
          </p>
        </div>
      </section>

      <section className="contactContent">
        <div className="contactGrid">
          <aside className="contactInfoCard">
            <div className="contactInfoBlock">
              <p className="contactLabel">Email</p>
              <a className="contactMailLink" href="mailto:emiliagrama@gmail.com">
                emiliagrama@gmail.com
              </a>
            </div>

            <div className="contactInfoBlock">
              <p className="contactLabel">Project types</p>
              <ul className="contactList">
                <li>Portfolio websites</li>
                <li>Business websites</li>
                <li>UI systems</li>
                <li>Interactive frontend work</li>
                <li>Full web applications</li>
              </ul>
            </div>

            <div className="contactInfoBlock">
              <p className="contactLabel">What helps</p>
              <p className="contactSmallText">
                A short message with your goals, rough timeline, and the kind of
                site or product you want to build.
              </p>
            </div>
          </aside>

          <div className="contactFormCard">
            {!submitted ? (
              <form className="contactForm" onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex="-1"
                  className="contactHpField"
                  aria-hidden="true"
                />

                <div className="contactField">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={errors.name ? "is-error" : ""}
                  />
                  {errors.name && <p className="contactError">{errors.name}</p>}
                </div>

                <div className="contactFieldRow">
                  <div className="contactField">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@email.com"
                      className={errors.email ? "is-error" : ""}
                    />
                    {errors.email && (
                      <p className="contactError">{errors.email}</p>
                    )}
                  </div>

                  <div className="contactField">
                    <label htmlFor="projectType">Project type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="portfolio">Portfolio</option>
                      <option value="business-site">Business website</option>
                      <option value="ui-system">UI system</option>
                      <option value="interactive-frontend">
                        Interactive frontend
                      </option>
                      <option value="web-app">Web application</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="contactField">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="7"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, goals, or idea..."
                    className={errors.message ? "is-error" : ""}
                  />
                  {errors.message && (
                    <p className="contactError">{errors.message}</p>
                  )}
                </div>

                {serverError && <p className="contactError">{serverError}</p>}

                <div className="contactActions">
                  <button
                    type="submit"
                    className="contactSubmitBtn"
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send message"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="contactSuccess">
                <p className="contactEyebrow">MESSAGE SENT</p>
                <h2>Thanks — your message has been sent.</h2>
                <p>
                  I received your message and will get back to you as soon as I
                  can.
                </p>

                <button
                  type="button"
                  className="contactSubmitBtn"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      projectType: "",
                      message: "",
                      website: ""
                    });
                    setErrors({});
                    setServerError("");
                  }}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}