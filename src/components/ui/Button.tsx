import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white focus:ring-secondary',
    outline: 'border border-neutral-300 hover:bg-neutral-100 text-neutral-800 focus:ring-primary',
    ghost: 'hover:bg-neutral-100 text-neutral-800 focus:ring-primary',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5 rounded-lg',
    md: 'text-base px-4 py-2 rounded-xl',
    lg: 'text-lg px-6 py-3 rounded-xl',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;