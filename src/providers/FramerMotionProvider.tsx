
import React from 'react';
import { MotionConfig } from 'framer-motion';

export const FramerMotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
};
