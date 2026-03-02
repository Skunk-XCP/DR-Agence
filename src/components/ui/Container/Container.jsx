import React from "react";
import styles from "./Container.module.css";

const Container = ({ children, className = "" }) => {
  return <div className={`${styles.container} ${className}`.trim()}>{children}</div>;
};

export default Container;
