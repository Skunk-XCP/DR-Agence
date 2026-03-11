"use client";

import { motion, useReducedMotion } from "framer-motion";

const Reveal = ({ children, className = "", delay = 0, y = 16 }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
