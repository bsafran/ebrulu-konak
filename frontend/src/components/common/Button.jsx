import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary-accent text-primary-light hover:bg-opacity-90 focus:ring-primary-accent',
    secondary: 'bg-primary-dark text-primary-light hover:bg-opacity-90 focus:ring-primary-dark',
    ghost: 'bg-transparent border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-dark focus:ring-primary-accent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
