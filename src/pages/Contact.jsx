import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
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
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);
  const projectMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        projectMenuRef.current &&
        !projectMenuRef.current.contains(event.target)
      ) {
        setProjectMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

useEffect(() => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) return;

  const ctx = gsap.context(() => {
    const fieldRow = formCardRef.current?.querySelector(".contactFieldRow");
    const nameField = formCardRef.current?.querySelector('.contactField label[for="name"]')?.closest(".contactField");
    const messageField = formCardRef.current?.querySelector('.contactField label[for="message"]')?.closest(".contactField");
    const actions = formCardRef.current?.querySelector(".contactActions");

    gsap.set(
      [heroRef.current, infoCardRef.current, formCardRef.current],
      {
        opacity: 0,
        y: 18
      }
    );

    gsap.set([nameField, fieldRow, messageField, actions], {
      opacity: 0,
      y: 14
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" }
    });

    tl.to(heroRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      clearProps: "transform,opacity"
    })
      .to(
        [infoCardRef.current, formCardRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          clearProps: "transform,opacity"
        },
        "-=0.35"
      )
      .to(
        [nameField, fieldRow, messageField, actions],
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          clearProps: "transform,opacity"
        },
        "-=0.35"
      );
  }, pageRef);

  return () => ctx.revert();
}, []);;

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

    function handleProjectSelect(value) {
    setForm((prev) => ({
      ...prev,
      projectType: value,
    }));

    setProjectMenuOpen(false);
  }

  return (
    <main className="contactPage" ref={pageRef}>
      <section className="contactHero">
        <div className="contactHero__inner" ref={heroRef}>
          <p className="contactHeroEyebrow">START A CONVERSATION</p>

          <h1>
            Have something in mind?
            <span> Make some noise.</span>
          </h1>

          <p className="contactIntro">
            Tell me what you're building. I'll help turn the idea into something
            clear, useful, and real.
          </p>
        </div>
      </section>

      <section className="contactContent">
        <div className="contactGrid">
          <aside className="contactInfoCard" ref={infoCardRef}>
            <div className="contactInfoBlock">
              <p className="contactLabel">Email</p>
              <a
                className="contactMailLink"
                href="mailto:emiliagrama@gmail.com"
              >
                emiliagrama@gmail.com
              </a>
            </div>

            <div className="contactInfoBlock">
              <p className="contactLabel">Project types</p>
            <div className="contactServices">
              <span>Portfolio websites</span>
              <span>Business websites</span>
              <span>SaaS products</span>
              <span>UI systems</span>
              <span>Interactive frontend</span>
              <span>Custom web applications</span>
            </div>
            </div>

            <div className="contactInfoBlock">
              <p className="contactLabel">TO GET STARTED</p>
              <p className="contactSmallText">
                Keep it simple. Clarity matters more than detail.
              </p>
            </div>
          </aside>

          <div className="contactFormCard" ref={formCardRef}>
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
                    spellCheck={false}
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
                      spellCheck={false}
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
                    <label htmlFor="projectTypeTrigger">What can I help with?</label>

                    <input
                      type="hidden"
                      name="projectType"
                      value={form.projectType}
                    />

                    <div className="customSelect" ref={projectMenuRef}>
                      <button
                        id="projectTypeTrigger"
                        type="button"
                        className={`customSelectTrigger ${
                          projectMenuOpen ? "is-open" : ""
                        }`}
                        onClick={() => setProjectMenuOpen((prev) => !prev)}
                        aria-haspopup="listbox"
                        aria-expanded={projectMenuOpen}
                      >
                        <span>
                          {form.projectType === "new-project" && "New website / application"}
                          {form.projectType === "improvements" && "Improve an existing project"}
                          {form.projectType === "debugging" && "Debugging"}
                          {form.projectType === "maintenance" && "Maintenance"}
                          {form.projectType === "advice" && "Technical advice"}
                          {form.projectType === "other" && "Other"}
                          {!form.projectType && "Select"}
                        </span>

                        <span className="customSelectArrow">▾</span>
                      </button>

                      {projectMenuOpen && (
                        <ul className="customSelectMenu" role="listbox">
                          <li>
                            <button
                              type="button"
                              onClick={() => handleProjectSelect("new-project")}
                            >
                              New website / application
                            </button>
                          </li>

                          <li>
                            <button
                              type="button"
                              onClick={() => handleProjectSelect("improvements")}
                            >
                              Improve an existing project
                            </button>
                          </li>

                          <li>
                            <button
                              type="button"
                              onClick={() => handleProjectSelect("debugging")}
                            >
                              Debugging
                            </button>
                          </li>

                          <li>
                            <button
                              type="button"
                              onClick={() => handleProjectSelect("maintenance")}
                            >
                              Maintenance
                            </button>
                          </li>

                          <li>
                            <button
                              type="button"
                              onClick={() => handleProjectSelect("advice")}
                            >
                              Technical advice
                            </button>
                          </li>

                          <li>
                            <button
                              type="button"
                              onClick={() => handleProjectSelect("other")}
                            >
                              Other
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="contactField">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    spellCheck={false}
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
                  <p className="contactResponseTime">
                    Usually replies within 24h.
                  </p>

                  <button
                    type="submit"
                    className="btn btnBlue contactSubmitBtn"
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Start a project"}
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
                  className="btn btnBlue contactSubmitBtn"
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