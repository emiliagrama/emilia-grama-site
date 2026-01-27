export default function Button({
  children,
  variant = "glass",
  size = "md",
  shape = "pill",   // NEW: pill | soft | square | cut | hex
  fullWidth = false,
  loading = false,
  disabled = false,
  as: As = "button",
  className = "",
  // ✅ NEW: media background props
  bgImage,                
  bgPosition = "50% 50%",  
  bgZoom = 1.12,           
  ...props
}) {
  const classes = [
    "uiBtn",
    `uiBtn--${variant}`,
    `uiBtn--${size}`,
    `uiBtn--${shape}`,   
    fullWidth ? "uiBtn--full" : "",
    loading ? "uiBtn--loading" : "",
    className,
  ].filter(Boolean).join(" ");
  const style =
    variant === "media" && bgImage
      ? {
          "--btn-bg": `url(${bgImage})`,
          "--btn-bg-pos": bgPosition,
          "--btn-bg-zoom": bgZoom,
        }
      : undefined;

  const isDisabled = disabled || loading;

  return (
    <As 
    className={classes}
    style={style}
      disabled={As === "button" ? isDisabled : undefined}
      aria-disabled={As !== "button" ? isDisabled : undefined}
       {...props}>
      <span className="uiBtn__label">{children}</span>
      {loading && <span className="uiBtn__spinner" />}
    </As>
  );
}
