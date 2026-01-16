import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, icon, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        {icon && <div className="text-primary-500">{icon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
