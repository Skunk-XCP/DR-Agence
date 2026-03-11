"use client";

import { motion, useReducedMotion } from "framer-motion";

const Stagger = ({ children, className = "", stagger = 0.1, delayChildren = 0.05 }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
            delayChildren: reduceMotion ? 0 : delayChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 },
        show: reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Stagger;
