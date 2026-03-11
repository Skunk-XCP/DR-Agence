"use client";

import { motion, useReducedMotion } from "framer-motion";

const SlideIn = ({ children, className = "", direction = "left", delay = 0 }) => {
  const reduceMotion = useReducedMotion();
  const x = direction === "left" ? -28 : 28;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x, filter: "blur(6px)" }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
