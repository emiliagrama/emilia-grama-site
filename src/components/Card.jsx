import React from "react";

export default function Card({
  variant = "default", // default | glass | glow | media | flip
  title,
  subtitle,
  eyebrow,
  children,
  icon,
  image,
  video,
  href,
  ctaLabel = "View",
  align = "left", // left | center
  className = "",
}) {
const Root = "div";
const baseProps = {};

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
                    className="cardMedia_img"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-hidden="true"
                  />
                  <div className="cardMedia_overlay" aria-hidden="true" />
                </div>
              ) : null}

              <div className="cardFlip_hint">Hover to reveal →</div>
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
        {
        (variant === "media" || variant === "media_img") && (image || video) && (
          <div className="cardMedia">
            {video ? (
              <video
                className="cardMedia_video"
                src={video}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            ) : (
              <div
                className="cardMedia_img"
                style={{ backgroundImage: `url(${image})` }}
                aria-hidden="true"
              />
            )}
            <div className="cardMedia_overlay" aria-hidden="true" />
          </div>
        )
}

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

          {ctaLabel && (
            <div className="card__ctaRow">
              <button type="button" className="card__cta">
                {ctaLabel} →
              </button>
            </div>
          )}

        </div>
      </Root>
    </div>
  );
}
