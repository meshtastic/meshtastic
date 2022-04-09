import React from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

export const Button = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      {...props}
      whileHover={{ scale: 1.1, backgroundColor: 'var(--tertiary)' }}
      whileTap={{ scale: 1.0 }}
      className="m-auto flex cursor-pointer rounded-full bg-secondary p-3 shadow-md"
    >
      <div className="m-auto">{children}</div>
    </motion.div>
  );
};
