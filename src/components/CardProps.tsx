import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md border p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '' }: CardProps) => {
  return <div className={`text-gray-800 ${className}`}>{children}</div>;
};
