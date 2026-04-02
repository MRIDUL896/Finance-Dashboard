import { motion } from "framer-motion";

export default function HoverCard({
  children,
  className = "",
  disableScale = false,
}) {
  return (
    <motion.div
      whileHover={
        disableScale
          ? { transition: { duration: 0.2 } }
          : {
              scale: 1.03,
              y: -4,
              transition: { type: "spring", stiffness: 260, damping: 18 },
            }
      }
      className={`rounded-3xl transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-500/40 ${className}`}
    >
      {children}
    </motion.div>
  );
}