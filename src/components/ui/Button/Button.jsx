import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  type = "button",
  className = "",
  ...rest
}) => {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
