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
  ...props
}) {
  const classes = [
    "uiBtn",
    `uiBtn--${variant}`,
    `uiBtn--${size}`,
    `uiBtn--${shape}`,   // 👈 here
    fullWidth ? "uiBtn--full" : "",
    loading ? "uiBtn--loading" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <As className={classes} {...props}>
      <span className="uiBtn__label">{children}</span>
      {loading && <span className="uiBtn__spinner" />}
    </As>
  );
}
