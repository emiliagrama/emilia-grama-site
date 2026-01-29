import React from "react";

export default function Card({
  variant = "default", // default | glass | glow | media | flip
  title,
  subtitle,
  eyebrow,
  children,
  icon,
  image,
  href,
  ctaLabel = "View",
  align = "left", // left | center
  className = "",
}) {
  const isLink = Boolean(href);

  const Root = isLink ? "a" : "div";

  const baseProps = isLink
    ? { href, className: "card__linkWrap", "aria-label": title || "Card link" }
    : {};

  const cardClass = [
    "card",
    `card--${variant}`,
    align === "center" ? "card--center" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // FLIP variant uses a different internal structure
  if (variant === "flip") {
    return (
      <div className={cardClass}>
        <div className="cardFlip">
          <div className="cardFlip__inner">
            <div className="cardFlip__face cardFlip__front">
              <div className="card__top">
                {icon ? <div className="card__icon">{icon}</div> : null}
                <div className="card__titles">
                  {eyebrow ? <div className="card__eyebrow">{eyebrow}</div> : null}
                  {title ? <h3 className="card__title">{title}</h3> : null}
                  {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
                </div>
              </div>

              {image ? (
                <div className="cardMedia">
                  <div
                    className="cardMedia__img"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-hidden="true"
                  />
                  <div className="cardMedia__overlay" aria-hidden="true" />
                </div>
              ) : null}

              <div className="card__body">{children}</div>
            </div>

            <div className="cardFlip__face cardFlip__back">
              <div className="card__top">
                <div className="card__titles">
                  <div className="card__eyebrow">Details</div>
                  {title ? <h3 className="card__title">{title}</h3> : null}
                  {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
                </div>
              </div>

              <div className="card__body">
                {children}
                <div className="card__ctaRow">
                  {href ? (
                    <a className="card__cta" href={href}>
                      {ctaLabel} →
                    </a>
                  ) : (
                    <button className="card__cta" type="button">
                      {ctaLabel} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ALL other variants
  return (
    <div className={cardClass}>
      <Root {...baseProps}>
        {variant === "media" && image ? (
          <div className="cardMedia">
            <div
              className="cardMedia__img"
              style={{ backgroundImage: `url(${image})` }}
              aria-hidden="true"
            />
            <div className="cardMedia__overlay" aria-hidden="true" />
          </div>
        ) : null}

        <div className="card__content">
          <div className="card__top">
            {icon ? <div className="card__icon">{icon}</div> : null}
            <div className="card__titles">
              {eyebrow ? <div className="card__eyebrow">{eyebrow}</div> : null}
              {title ? <h3 className="card__title">{title}</h3> : null}
              {subtitle ? <p className="card__subtitle">{subtitle}</p> : null}
            </div>
          </div>

          {children ? <div className="card__body">{children}</div> : null}

          {(href || ctaLabel) && (
            <div className="card__ctaRow">
              {href ? (
                <span className="card__cta">
                  {ctaLabel} →
                </span>
              ) : null}
            </div>
          )}
        </div>
      </Root>
    </div>
  );
}
