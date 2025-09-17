import { memo } from "react";

function Button({ children, variant = "default", ...rest }) {
  const className = [
    "btn",
    variant === "primary" ? "primary" : "",
    variant === "ghost" ? "ghost" : "",
    variant === "danger" ? "danger" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

export default memo(Button);
