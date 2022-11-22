import { motion } from "framer-motion";
import React from "react";

const Link = React.forwardRef(
  (
    {
      path,
      className,
    }: {
      path: string;
      className?: string;
      index: number;
    },
    ref: React.Ref<SVGPathElement>
  ) => (
    <motion.path
      className={className}
      ref={ref}
      variants={{
        enter: {
          opacity: 1,
        },
        animate: { opacity: 1, d: path },
        exit: {
          opacity: 0,
        },
      }}
      animate="animate"
      exit="exit"
      initial="enter"
    />
  )
);

Link.displayName = "Link";
export default Link;
