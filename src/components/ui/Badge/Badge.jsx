import React from "react";
import styles from "./Badge.module.css";

const Badge = ({ children, variant = "soft", className = "" }) => {
  return <span className={`${styles.badge} ${styles[variant]} ${className}`.trim()}>{children}</span>;
};

export default Badge;
