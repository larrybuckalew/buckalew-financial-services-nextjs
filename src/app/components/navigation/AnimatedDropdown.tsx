'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: string;
}

const AnimatedDropdown: React.FC<DropdownProps> = ({ 
  trigger, 
  children, 
  align = 'left',
  width = 'w-64'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} mt-2 ${width} bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50`}
            style={{ 
              transformOrigin: align === 'left' ? 'top left' : 'top right'
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdown;