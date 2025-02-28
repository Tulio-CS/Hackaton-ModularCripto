import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  interactive = false,
}) => {
  const baseClasses = 'bg-white rounded-apple shadow-apple overflow-hidden';
  const interactiveClasses = interactive ? 'cursor-pointer transition-all hover:shadow-apple-lg' : '';
  
  return (
    <motion.div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
      whileHover={interactive ? { y: -4 } : {}}
      whileTap={interactive ? { y: 0 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;