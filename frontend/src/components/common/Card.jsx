import React from 'react';

const Card = ({
  children,
  className = '',
  onClick,
  hover = true,
  ...props
}) => {
  const baseStyles = 'rounded-lg p-6 bg-white transition-all duration-200';

  const borderStyles = 'border border-gray-200';

  const hoverStyles = hover
    ? 'hover:shadow-md cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${borderStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
