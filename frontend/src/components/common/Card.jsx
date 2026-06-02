import React from 'react';

const Card = ({
  children,
  className = '',
  onClick,
  glassmorphism = false,
  hover = true,
  ...props
}) => {
  const baseStyles = 'rounded-2xl p-6 shadow-lg transition-all duration-300';

  const glassStyles = glassmorphism
    ? 'glass-effect'
    : 'bg-white border border-gray-100';

  const hoverStyles = hover
    ? 'hover:shadow-xl hover:scale-105 cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
